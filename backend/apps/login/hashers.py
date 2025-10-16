from decouple import config
from django.contrib.auth.hashers import Argon2PasswordHasher

PEPPER = config("PASSWORD_PEPPER", default="")  # ← viene de tu .env

class PepperedArgon2PasswordHasher(Argon2PasswordHasher):
    algorithm = "argon2_peppered"
    def encode(self, password, salt, *args, **kwargs):
        return super().encode(password + PEPPER, salt, *args, **kwargs)
    def verify(self, password, encoded):
        return super().verify(password + PEPPER, encoded)