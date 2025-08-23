-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE kyc_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE transaction_status AS ENUM ('pending', 'confirmed', 'failed');
CREATE TYPE transaction_type AS ENUM ('transfer', 'stake', 'unstake', 'reward');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    email TEXT UNIQUE NOT NULL,
    wallet_address TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    kyc_status kyc_status DEFAULT 'pending',
    tier INTEGER DEFAULT 1,
    total_balance DECIMAL(20,8) DEFAULT 0,
    staked_balance DECIMAL(20,8) DEFAULT 0
);

-- Wallets table
CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    address TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    balance DECIMAL(20,8) DEFAULT 0,
    nonce INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hash TEXT UNIQUE NOT NULL,
    from_address TEXT NOT NULL,
    to_address TEXT NOT NULL,
    amount DECIMAL(20,8) NOT NULL,
    fee DECIMAL(20,8) NOT NULL,
    status transaction_status DEFAULT 'pending',
    block_number BIGINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    type transaction_type NOT NULL,
);

-- Indexes for performance (must be created outside CREATE TABLE)
CREATE INDEX IF NOT EXISTS idx_transactions_from_address ON transactions (from_address);
CREATE INDEX IF NOT EXISTS idx_transactions_to_address ON transactions (to_address);
CREATE INDEX IF NOT EXISTS idx_transactions_hash ON transactions (hash);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions (created_at);

-- Staking pools table
CREATE TABLE staking_pools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    apy DECIMAL(5,2) NOT NULL, -- Annual Percentage Yield
    min_stake DECIMAL(20,8) NOT NULL,
    total_staked DECIMAL(20,8) DEFAULT 0,
    max_capacity DECIMAL(20,8) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User stakes table
CREATE TABLE user_stakes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    pool_id UUID REFERENCES staking_pools(id) ON DELETE CASCADE,
    amount DECIMAL(20,8) NOT NULL,
    rewards_earned DECIMAL(20,8) DEFAULT 0,
    staked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    unstaked_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true
);

-- Price history table for analytics
CREATE TABLE price_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    price_usd DECIMAL(10,6) NOT NULL,
    volume_24h DECIMAL(20,8) DEFAULT 0,
    market_cap DECIMAL(20,2) DEFAULT 0,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create functions for balance calculations
CREATE OR REPLACE FUNCTION get_user_balance(user_wallet TEXT)
RETURNS DECIMAL(20,8) AS $$
BEGIN
    RETURN (
        SELECT balance 
        FROM wallets 
        WHERE address = user_wallet
    );
END;
$$ LANGUAGE plpgsql;

-- Function to calculate staking rewards
CREATE OR REPLACE FUNCTION calculate_staking_rewards(user_uuid UUID, pool_uuid UUID)
RETURNS DECIMAL(20,8) AS $$
DECLARE
    stake_amount DECIMAL(20,8);
    pool_apy DECIMAL(5,2);
    days_staked INTEGER;
    daily_reward DECIMAL(20,8);
BEGIN
    -- Get stake amount and pool APY
    SELECT us.amount, sp.apy
    INTO stake_amount, pool_apy
    FROM user_stakes us
    JOIN staking_pools sp ON us.pool_id = sp.id
    WHERE us.user_id = user_uuid AND us.pool_id = pool_uuid AND us.is_active = true;
    
    -- Calculate days staked
    SELECT EXTRACT(DAY FROM NOW() - us.staked_at)
    INTO days_staked
    FROM user_stakes us
    WHERE us.user_id = user_uuid AND us.pool_id = pool_uuid AND us.is_active = true;
    
    -- Calculate daily reward
    daily_reward := (stake_amount * pool_apy / 100) / 365;
    
    RETURN daily_reward * days_staked;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stakes ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own wallets" ON wallets
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON transactions
    FOR SELECT USING (
        auth.uid() IN (
            SELECT user_id FROM wallets 
            WHERE address = from_address OR address = to_address
        )
    );

-- Insert default staking pools
INSERT INTO staking_pools (name, apy, min_stake, max_capacity) VALUES
('Pool Básico', 8.5, 100, 10000000),
('Pool Premium', 12.0, 1000, 50000000),
('Pool Elite', 15.5, 10000, 100000000);

-- Insert initial price data
INSERT INTO price_history (price_usd, volume_24h, market_cap) VALUES
(0.12, 1250000, 30000000);
