def get_features(df):
    X = df[[
        "active_connections",
        "cpu_usage_percent",
        "memory_usage_percent",
        "network_latency_ms"
    ]]
    y = df["response_time_ms"]
    return X, y
