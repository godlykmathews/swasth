from functools import lru_cache
import os
from pathlib import Path
from urllib.parse import urlparse

from dotenv import load_dotenv

BACKEND_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BACKEND_DIR / ".env")
load_dotenv()


class Settings:
    def __init__(self) -> None:
        self.supabase_url = (
            os.getenv("SUPABASE_URL")
            or os.getenv("NEXT_PUBLIC_SUPABASE_URL")
            or "https://xrqfbhrchjhdmlidyjlc.supabase.co"
        )
        self.supabase_publishable_key = (
            os.getenv("SUPABASE_KEY")
            or os.getenv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")
            or ""
        )
        self.db_host = os.getenv("SUPABASE_DB_HOST") or self._derive_db_host(self.supabase_url)
        self.db_port = int(os.getenv("SUPABASE_DB_PORT", "5432"))
        self.db_name = os.getenv("SUPABASE_DB_NAME", "postgres")
        self.db_user = os.getenv("SUPABASE_DB_USER", "postgres")
        self.database_url = os.getenv("DATABASE_URL") or os.getenv("SUPABASE_DATABASE_URL") or ""
        self.db_password = (
            os.getenv("SUPABASE_DB_PASSWORD")
            or os.getenv("SUPABASE_PASSWORD")
            or os.getenv("POSTGRES_PASSWORD")
            or ""
        )
        self.cloudinary_url = os.getenv("CLOUDINARY_URL", "")
        self.cloudinary_cloud_name = os.getenv("CLOUDINARY_CLOUD_NAME", "")
        self.cloudinary_api_key = os.getenv("CLOUDINARY_API_KEY", "")
        self.cloudinary_api_secret = os.getenv("CLOUDINARY_API_SECRET", "")
        self.openai_api_key = os.getenv("OPENAI_API_KEY", "")
        self.openai_model = os.getenv("OPENAI_MODEL", "gpt-4.1-mini")
        self.auto_migrate = os.getenv("AUTO_MIGRATE", "true").lower() in {"1", "true", "yes"}
        self.cors_origins = [
            origin.strip()
            for origin in os.getenv(
                "CORS_ORIGINS",
                "http://localhost:3000,http://127.0.0.1:3000,http://localhost:3001,http://127.0.0.1:3001",
            ).split(",")
            if origin.strip()
        ]

    def _derive_db_host(self, supabase_url: str) -> str:
        hostname = urlparse(supabase_url).hostname or ""
        project_ref = hostname.split(".")[0] if hostname else "xrqfbhrchjhdmlidyjlc"
        return f"db.{project_ref}.supabase.co"

    @property
    def database_configured(self) -> bool:
        return bool(self.database_url or self.db_password)

    @property
    def cloudinary_configured(self) -> bool:
        return bool(self.cloudinary_url) or bool(
            self.cloudinary_cloud_name and self.cloudinary_api_key and self.cloudinary_api_secret
        )

    @property
    def openai_configured(self) -> bool:
        return bool(self.openai_api_key)

    @property
    def dsn(self) -> str:
        if self.database_url:
            return self.database_url
        return (
            f"host={self.db_host} port={self.db_port} dbname={self.db_name} "
            f"user={self.db_user} password={self.db_password} sslmode=require"
        )


@lru_cache
def get_settings() -> Settings:
    return Settings()
