"""
Permissions Handler

Handles user permission requests.
"""

from handlers.base import BaseHandler
from auth.main import get_user_permissions


class PermissionsHandler(BaseHandler):
    """
    Handler for fetching user permissions.

    Endpoint: GET /api/user/permissions
    """

    def get(self):
        """
        Get current user's permissions.

        Returns:
            JSON object with tabs and tool permissions
        """
        user_id = self.get_current_user()

        if not user_id:
            self.set_status(401)
            self.write_json({
                'error': 'Unauthorized',
                'message': 'User not authenticated'
            })
            return

        # Get permissions for the user
        permissions = get_user_permissions(user_id)

        # Return permissions as JSON
        self.write_json(permissions)
