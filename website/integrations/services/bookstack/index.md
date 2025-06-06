---
title: Integrate with Bookstack
sidebar_label: Bookstack
support_level: community
---

## What is Bookstack

> BookStack is a free and open-source wiki software aimed for a simple, self-hosted, and easy-to-use platform. Based on Laravel, a PHP framework, BookStack is released under the MIT License. It uses the ideas of books to organise pages and store information. BookStack is multilingual and available in over thirty languages. For the simplicity, BookStack is considered as suitable for smaller businesses or freelancers.
>
> -- https://en.wikipedia.org/wiki/BookStack

:::note
This is based on authentik 2021.7.2 and BookStack V21.05.3. Instructions may differ between versions.
:::

## Preparation

The following placeholders are used in this guide:

- `book.company` is the FQDN of BookStack.
- `authentik.company` is the FQDN of authentik.
- `METADATAURL` is the url for the SAML metadata from authentik

:::note
This documentation lists only the settings that you need to change from their default values. Be aware that any changes other than those explicitly mentioned in this guide could cause issues accessing your application.
:::

## authentik configuration

To support the integration of BookStack with authentik, you need to create an application/provider pair in authentik.

### Create an application and provider in authentik

1. Log in to authentik as an admin, and open the authentik Admin interface.
2. Navigate to **Applications** > **Applications** and click **Create with Provider** to create an application and provider pair. (Alternatively you can create only an application, without a provider, by clicking **Create**.)

- **Application**: provide a descriptive name, an optional group for the type of application, the policy engine mode, and optional UI settings.
- **Choose a Provider type**: select **OAuth2/OpenID Connect** as the provider type.
- **Configure the Provider**: provide a name (or accept the auto-provided name), the authorization flow to use for this provider, and the following required configurations.
    - Note the **Client ID**, **Client Secret**, and **slug** values because they will be required later.
    - Set a `Strict` redirect URI to <kbd>https://<em>bookstack.company</em>/oidc/callback/</kbd>.
    - Select any available signing key.
- **Configure Bindings** _(optional)_: you can create a [binding](/docs/add-secure-apps/flows-stages/bindings/) (policy, group, or user) to manage the listing and access to applications on a user's **My applications** page.

3. Click **Submit** to save the new application and provider.

## Bookstack configuration

Edit the `.env` file inside of the `www` folder of Bookstack.

Modify the following Example SAML config and paste incorporate into your `.env` file

```bash
# Set authentication method to be saml2
AUTH_METHOD=saml2
# Control if BookStack automatically initiates login via your SAML system if it's the only authentication method.
# Prevents the need for the user to click the "Login with x" button on the login page.
# Setting this to true enables auto-initiation.
AUTH_AUTO_INITIATE=true
# Set the display name to be shown on the login button.
# (Login with <name>)
SAML2_NAME=authentik
# Name of the attribute which provides the user's email address
SAML2_EMAIL_ATTRIBUTE=email
# Name of the attribute to use as an ID for the SAML user.
SAML2_EXTERNAL_ID_ATTRIBUTE=uid
# Enable SAML group sync.
SAML2_USER_TO_GROUPS=true
# Set the attribute from which BookStack will read groups names from.
# You will need to rename your roles in Bookstack to match your groups in authentik.
SAML2_GROUP_ATTRIBUTE=http://schemas.xmlsoap.org/claims/Group
# Name of the attribute(s) to use for the user's display name
# Can have multiple attributes listed, separated with a '|' in which
# case those values will be joined with a space.
# Example: SAML2_DISPLAY_NAME_ATTRIBUTES=firstName|lastName
# Defaults to the ID value if not found.
SAML2_DISPLAY_NAME_ATTRIBUTES=http://schemas.microsoft.com/ws/2008/06/identity/claims/windowsaccountname
# Identity Provider entityID URL
SAML2_IDP_ENTITYID=METADATAURL
# Auto-load metadata from the IDP
# Setting this to true negates the need to specify the next three options
SAML2_AUTOLOAD_METADATA=true

```

:::note
Bookstack Reference link: https://www.bookstackapp.com/docs/admin/saml2-auth/
:::

## Notes

:::note
BookStack will attempt to match the SAML user to an existing BookStack user based on a stored external id attribute otherwise, if not found, BookStack will effectively auto-register that user to provide a seamless access experience.
:::

:::note
SAML Group Sync is supported by Bookstack. Review the BookStack documentation on the required Environment variables. https://www.bookstackapp.com/docs/admin/saml2-auth/
:::

:::note
In some cases you might need to define the full SAML property name.
i.e.: `SAML2_GROUP_ATTRIBUTE="http://schemas.xmlsoap.org/claims/Group"`
See https://github.com/BookStackApp/BookStack/issues/3109 for more details.
:::
