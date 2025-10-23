"""
Permission Decorators

Decorators for protecting endpoints with permission checks.
"""

import functools
from auth.main import get_user_permissions


def requires_permissions(tab=None, tool=None):
    """
    Decorator to require specific permissions for an endpoint.

    Usage:
        @requires_permissions(tab='dd', tool='publisher')
        def post(self):
            # Only users with DD tab + publisher tool access can call this
            pass

    Args:
        tab: Required tab permission (e.g., 'dd', 'rad')
        tool: Required tool permission (e.g., 'publisher', 'rpm')

    Returns:
        Decorated function that checks permissions before executing
    """
    def decorator(method):
        @functools.wraps(method)
        def wrapper(self, *args, **kwargs):
            # Get current user
            user_id = self.get_current_user()

            if not user_id:
                self.set_status(401)
                self.write_json({
                    'error': 'Unauthorized',
                    'message': 'User not authenticated'
                })
                return

            # Get user permissions
            permissions = get_user_permissions(user_id)

            # Check tab permission
            if tab and tab not in permissions.get('tabs', []):
                self.set_status(403)
                self.write_json({
                    'error': 'Forbidden',
                    'message': f'User does not have access to {tab} tab'
                })
                return

            # Check tool permission
            if tool and tab:
                tab_tools = permissions.get(tab, [])
                if tool not in tab_tools:
                    self.set_status(403)
                    self.write_json({
                        'error': 'Forbidden',
                        'message': f'User does not have access to {tool} tool in {tab} tab'
                    })
                    return

            # Permission check passed, call the original method
            return method(self, *args, **kwargs)

        return wrapper
    return decorator


def requires_any_permission(*permissions_list):
    """
    Decorator to require ANY of the specified permissions.

    Usage:
        @requires_any_permission(
            ('dd', 'publisher'),
            ('rad', 'rpm')
        )
        def get(self):
            # User needs either DD/publisher OR RAD/rpm access
            pass

    Args:
        *permissions_list: Tuples of (tab, tool) permissions

    Returns:
        Decorated function that checks if user has any of the permissions
    """
    def decorator(method):
        @functools.wraps(method)
        def wrapper(self, *args, **kwargs):
            user_id = self.get_current_user()

            if not user_id:
                self.set_status(401)
                self.write_json({
                    'error': 'Unauthorized',
                    'message': 'User not authenticated'
                })
                return

            permissions = get_user_permissions(user_id)

            # Check if user has ANY of the required permissions
            has_permission = False
            for tab, tool in permissions_list:
                if tab in permissions.get('tabs', []):
                    if not tool or tool in permissions.get(tab, []):
                        has_permission = True
                        break

            if not has_permission:
                self.set_status(403)
                self.write_json({
                    'error': 'Forbidden',
                    'message': 'User does not have required permissions'
                })
                return

            return method(self, *args, **kwargs)

        return wrapper
    return decorator
