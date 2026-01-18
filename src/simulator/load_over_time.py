import time
import random

def simulate_load_over_time(df, duration=10):
    print("\n========================================")
    print("TIME BASED LOAD ARRIVAL MONITORING")
    print("========================================\n")

    total_connections = df["active_connections"].sum()

    for t in range(duration):
        incoming_requests = random.randint(1, 6)

        total_connections += incoming_requests

        print(
            f"[TIME {t}s] "
            f"Incoming Requests: {incoming_requests} | "
            f"Total Active Connections: {total_connections}"
        )

        time.sleep(1)
