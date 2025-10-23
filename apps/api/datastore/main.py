# Mocking the internal object store "Hydra" with a simple in-memory dictionary
class HydraStore:
    def __init__(self):
        self.store = {}

    def get(self, key):
        return self.store.get(key, None)

    def set(self, key, value):
        self.store[key] = value
        return True
