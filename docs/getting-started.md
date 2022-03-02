import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

import newProject from "./assets/new-project.png";
import listProxyLogs from "./assets/list-proxy-logs.png";
import copyToSender from "./assets/copy-to-sender.png";
import sender from "./assets/sender.png";

# Getting Started

Let's get up and running with Hetty! If you get stuck, [start a discussion](https://github.com/dstotijn/hetty/discussions)
or ask for help on the [Discord server](https://discord.gg/3HVsj5pTFP).

## Install

The quickest way to install and update Hetty is via a package manager:

<Tabs groupId="operating-systems">
<TabItem value="darwin" label="macOS">

```sh
brew install hettysoft/hetty/hetty
```

</TabItem>
<TabItem value="linux" label="Linux">

```sh
sudo snap install hetty
```

</TabItem>
<TabItem value="windows" label="Windows">

```sh
scoop bucket add hettysoft https://github.com/hettysoft/scoop.git
scoop install hettysoft/hetty
```

</TabItem>
</Tabs>

Alternatively, you can [download the latest release from
GitHub](https://github.com/dstotijn/hetty/releases/latest) for your OS and
architecture, and move the binary to a directory in your `$PATH`. If your OS is
not available for one of the package managers or not listed in the GitHub
releases, you can compile from source _(link?)_ or use a Docker image _(link?)_.

## Run

Once installed, start Hetty from the command line:

```sh
hetty
```

When invoked without any options, this:

- Creates a root CA certificate and private key, stored on disk at `~/.hetty/`
- Creates a BadgerDB database, stored on disk at `~/.hetty/db/`
- Runs an HTTP server that listens on `0.0.0.0:8080`, used for proxying and
  serving the admin interface

You should see the following console output:

```sh
2022/03/01 11:09:15 INFO [main] Hetty (v0.5.1) is running on :8080 ...
2022/03/01 11:09:15 INFO [main] Get started at http://localhost:8080
```

👉 You can now visit [http://localhost:8080](http://localhost:8080) to access
the admin interface.

:::tip

To easily use the HTTP proxy without manual setup, Hetty can invoke Chrome
(if installed) on startup with the correct predefined settings, via:

```sh
hetty --chrome
```

Alternatively, you can [trust the root CA certificate system wide](/docs/guides/trust-root-ca).

:::

## Create a project

1. Visit the the admin interface at [http://localhost:8080](http://localhost:8080)
   and click "Manage Projects".
2. Use the "New project" form to create an open a new project:
   <img src={newProject} width="539" alt="New project form (screenshot)" />

Once you have a project created and opened, any incoming HTTP requests proxied
by Hetty will be logged.

## Use the proxy

To use Hetty's HTTP proxy, you have several options:

- Run Hetty with `hetty --chrome` and use a preconfigured Chrome instance (recommended)
- Use a browser extension like
  [FoxyProxy](https://addons.mozilla.org/en-US/firefox/addon/foxyproxy-standard/)
  (Firefox) or [Proxy
  SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif)
  (Chrome)
- Configure system wide HTTP proxy settings (not recommended)

When using a browser extension for proxying, you can use `http://localhost:8080`
as the proxy URL (unless you've specified a custom listen address with the
`--addr` option).

:::note

If you're planning to use the proxy from a machine different than the one
running Hetty (e.g. another device in your LAN), you'll need to use a
non-loopback network address, e.g. the IP address assigned by your DHCP server.

:::

👉 With one of the above options, use the proxy by visiting a website to incur
some logs we'll use in the next section.

## View proxy logs

Once you've generated some traffic on the HTTP proxy, there should be some
requests logged. Let's review them by opening the _Proxy logs_ page in the admin
interface, found in the vertical menu bar on the left.

<img src={listProxyLogs} width="1512" alt="List proxy logs (screenshot)" />

### Copy to Sender

Use the "copy" icon next to any log entry to copy this request to the _Sender_
module, allowing you to edit and resend the HTTP request:

<img src={copyToSender} width="111" alt="Copy to Sender (screenshot)" />

## Edit & send request

Browse to the _Sender_ module via the vertical menu bar on the left.

<img src={sender} width="1512" alt="Sender module (screenshot)" />

At the bottom of the screen, click the request we just copied from the Proxy
logs.

Now you can edit the method, URL, request headers and body of the request. Every
time you click _Send_, a new request is sent and recorded in the history pane at
the bottom of the screen.

## What's next?

You should now be up and running with Hetty! 🎉 Check out the
[guides](/docs/category/guides) for more detailed feature documentation.
