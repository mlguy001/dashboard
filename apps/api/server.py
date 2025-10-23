
import tornado.ioloop
import tornado.web
import logging
import json
from auth.main import get_user_permissions

# Set up basic logging configuration for the server
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world!")

class PermissionsHandler(tornado.web.RequestHandler):
    def get(self):
        # For now, we'll just use a hardcoded user ID for demonstration purposes
        user_id = 'user_b'
        permissions = get_user_permissions(user_id)
        self.write(json.dumps(permissions))

# Create the Tornado application
def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/api/user/permissions", PermissionsHandler),
    ])

# Function to start the Tornado server
def main():
    app = make_app()
    app.listen(8888)
    logging.info("Server started at http://127.0.0.1:8888")
    tornado.ioloop.IOLoop.current().start()

if __name__ == "__main__":
    main()
