import time
import random

def simulate_requests(df, algorithms, num_requests=10):
    print("\n========================================")
    print("LIVE REQUEST ROUTING SIMULATION")
    print("========================================\n")

    for i in range(1, num_requests + 1):
        algo_name, algo_func = random.choice(list(algorithms.items()))
        server = algo_func(df)

        print(f"[REQUEST {i}] Algorithm: {algo_name} → Routed to Server {server}")

        # simulate increase in load
        df.loc[df["server_id"] == server, "active_connections"] += 1

        time.sleep(0.5)
