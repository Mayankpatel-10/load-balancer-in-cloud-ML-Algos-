def least_response_time(df):
    df["score"] = (
        df["response_time_ms"] +
        df["network_latency_ms"] +
        df["active_connections"]
    )
    best = df.loc[df["score"].idxmin()]
    return best["server_id"]
