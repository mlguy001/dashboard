"""
Tornado Server

Main entry point for the Dashboard API server.
"""

import tornado.ioloop
import tornado.web
import logging

from handlers.base import BaseHandler
from handlers.permissions import PermissionsHandler

# Set up basic logging configuration for the server
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


class MainHandler(BaseHandler):
    """Health check endpoint."""

    def get(self):
        self.write_json({
            'status': 'ok',
            'message': 'Dashboard API Server',
            'version': '1.0.0'
        })


# Create the Tornado application
def make_app():
    """
    Create and configure the Tornado application.

    Returns:
        tornado.web.Application: Configured Tornado app
    """
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/api/user/permissions", PermissionsHandler),
    ])


# Function to start the Tornado server
def main():
    """Start the Tornado server."""
    app = make_app()
    app.listen(8888)
    logging.info("Server started at http://127.0.0.1:8888")
    tornado.ioloop.IOLoop.current().start()


if __name__ == "__main__":
    main()
