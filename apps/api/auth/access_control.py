# --- Constants for Tabs and Tools ---

# All possible tabs in the dashboard
ALL_TABS = ['settings', 'rad', 'dd', 'exotics', 'ldfx', 'fxg', 'options', 'inflation']

# Tools available for each desk
DD_TOOLS = ['publisher', 'aggregator', 'sodrisk']
RAD_TOOLS = ['ingestor']
EXOTICS_TOOLS = ['rpm']
LDFX_TOOLS = ['rpm']
FXG_TOOLS = ['rpm']
OPTIONS_TOOLS = ['rpm']
INFLATION_TOOLS = ['rpm']

# --- User to Role Mapping ---
USER_ROLES = {
    'user_a': ['admin'],
    'user_b': ['dd_viewer'],
    'user_c': ['rad_admin', 'fxg_viewer'],
    'user_d': ['exotics_viewer'],
    'user_e': ['inflation_editor'],
}

# --- Role to Permissions Mapping ---
ROLES_PERMISSIONS = {
    'admin': {
        'tabs': ALL_TABS,
        'dd': DD_TOOLS,
        'rad': RAD_TOOLS,
        'exotics': EXOTICS_TOOLS,
        'ldfx': LDFX_TOOLS,
        'fxg': FXG_TOOLS,
        'options': OPTIONS_TOOLS,
        'inflation': INFLATION_TOOLS,
    },
    'dd_viewer': {
        'tabs': ['settings', 'dd'],
        'dd': DD_TOOLS,
    },
    'fxg_viewer': {
        'tabs': ['settings', 'fxg'],
        'fxg': [], # Can see the tab, but no tools within it
    },
    'exotics_viewer': {
        'tabs': ['settings', 'exotics'],
        'exotics': EXOTICS_TOOLS,
    },
    'inflation_editor': {
        'tabs': ['settings', 'inflation'],
        'inflation': INFLATION_TOOLS,
    },
}