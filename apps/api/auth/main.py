from .access_control import USER_ROLES, ROLES_PERMISSIONS, ALL_TABS

def get_user_permissions(user_id):
    if not user_id:
        return {}

    user_roles = USER_ROLES.get(user_id, [])
    permissions = {"tabs": set()}

    # Initialize permissions for all possible tabs
    for tab in ALL_TABS:
        permissions[tab] = set()

    for role in user_roles:
        role_permissions = ROLES_PERMISSIONS.get(role, {})
        if 'tabs' in role_permissions:
            permissions["tabs"].update(role_permissions['tabs'])
        
        for tab in ALL_TABS:
            if tab in role_permissions:
                permissions[tab].update(role_permissions[tab])

    # Convert sets to lists for JSON serialization
    permissions["tabs"] = list(permissions["tabs"])
    for tab in ALL_TABS:
        permissions[tab] = list(permissions[tab])
        
    return permissions
