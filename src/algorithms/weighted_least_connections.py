def weighted_least_connections(df):
    df["score"] = df["active_connections"] / df["server_capacity_weight"]
    best = df.loc[df["score"].idxmin()]
    return best["server_id"]
