"""
Base Handler

Provides common functionality for all API handlers.
"""

import tornado.web
import json


class BaseHandler(tornado.web.RequestHandler):
    """
    Base request handler with common functionality.

    All API handlers should inherit from this class.
    """

    def set_default_headers(self):
        """Set CORS headers for development."""
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.set_header("Access-Control-Allow-Headers", "Content-Type")

    def options(self, *args, **kwargs):
        """Handle OPTIONS requests for CORS preflight."""
        self.set_status(204)
        self.finish()

    def get_current_user(self):
        """
        Get the current user from the request.

        For now, returns a hardcoded user for development.
        In production, this will read from:
        - IIS-injected header (X-User)
        - Session cookie
        - JWT token

        Returns:
            str: User ID or None if not authenticated
        """
        # TODO: Read from request header in production
        # user_id = self.request.headers.get('X-User', None)

        # For now, hardcoded for development
        return 'user_a'

    def write_json(self, data):
        """
        Write JSON response.

        Args:
            data: Data to serialize as JSON
        """
        self.set_header("Content-Type", "application/json")
        self.write(json.dumps(data))

    def write_error(self, status_code, **kwargs):
        """
        Write error response.

        Args:
            status_code: HTTP status code
            **kwargs: Additional error information
        """
        self.set_header("Content-Type", "application/json")

        error_message = {
            400: "Bad Request",
            401: "Unauthorized",
            403: "Forbidden",
            404: "Not Found",
            500: "Internal Server Error",
        }.get(status_code, "Unknown Error")

        # Extract exception message if available
        if 'exc_info' in kwargs:
            exc_type, exc_value, exc_tb = kwargs['exc_info']
            if exc_value:
                error_message = str(exc_value)

        self.write(json.dumps({
            'error': error_message,
            'status': status_code
        }))
