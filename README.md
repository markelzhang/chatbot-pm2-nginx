# Chatbot UI

***quote: https://github.com/mckaywrigley/chatbot-ui.git***

Chatbot UI is an advanced chatbot kit for OpenAI's chat models built on top of [Chatbot UI Lite](https://github.com/mckaywrigley/chatbot-ui-lite) using Next.js, TypeScript, and Tailwind CSS.

See a [demo](https://twitter.com/mckaywrigley/status/1640380021423603713?s=46&t=AowqkodyK6B4JccSOxSPew).

![Chatbot UI](./public/screenshot.png)

## Updates

Chatbot UI will be updated over time.

Expect frequent improvements.

**Next up:**

- [ ] Delete messages
- [ ] More model settings
- [ ] Plugins

**Recent updates:**

- [x] Prompt templates (3/27/23)
- [x] Regenerate & edit responses (3/25/23)
- [x] Folders (3/24/23)
- [x] Search chat content (3/23/23)
- [x] Stop message generation (3/22/23)
- [x] Import/Export chats (3/22/23)
- [x] Custom system prompt (3/21/23)
- [x] Error handling (3/20/23)
- [x] GPT-4 support (access required) (3/20/23)
- [x] Search conversations (3/19/23)
- [x] Code syntax highlighting (3/18/23)
- [x] Toggle sidebar (3/18/23)
- [x] Conversation naming (3/18/23)
- [x] Github flavored markdown (3/18/23)
- [x] Add OpenAI API key in app (3/18/23)
- [x] Markdown support (3/17/23)

## Modifications

Modify the chat interface in `components/Chat`.

Modify the sidebar interface in `components/Sidebar`.

Modify the system prompt in `utils/index.ts`.

## Deploy

**Vercel**

Host your own live version of Chatbot UI with Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmckaywrigley%2Fchatbot-ui)

**Replit**

Fork Chatbot UI on Replit [here](https://replit.com/@MckayWrigley/chatbot-ui-pro?v=1).

**Docker**

Build locally:

```shell
docker build -t chatgpt-ui .
docker run -e OPENAI_API_KEY=xxxxxxxx -p 3000:3000 chatgpt-ui
```

Pull from ghcr:

```
docker run -e OPENAI_API_KEY=xxxxxxxx -p 3000:3000 ghcr.io/mckaywrigley/chatbot-ui:main
```

## Running Locally

**1. Clone Repo**

```bash
git clone https://github.com/mckaywrigley/chatbot-ui.git
```

**2. Install Dependencies**

```bash
npm i
```

**3. Provide OpenAI API Key**

Create a .env.local file in the root of the repo with your OpenAI API Key:

```bash
OPENAI_API_KEY=YOUR_KEY
```

> You can set `OPENAI_API_HOST` where access to the official OpenAI host is restricted or unavailable, allowing users to configure an alternative host for their specific needs.

> Additionally, if you have multiple OpenAI Organizations, you can set `OPENAI_ORGANIZATION` to specify one.

**4. Run App**

```bash
npm run dev
```

**5. Use It**

You should be able to start chatting.

## Deploy Locally

**1. Install pm2 global first**

```bash
npm install pm2 -g
```

**2. Run deploy**

```bash
npm run deploy
```

then open broswer with (http://localhost:8000)[http://localhost:8000]

**3. Nginx install and config**

***安装nginx***

1. 安装epel源
由于Nginx在官方的默认yum源中并不包含，因此需要先安装epel源。
```bash
sudo yum install epel-release
```

2. 安装Nginx
执行以下命令安装最新的Nginx 版本：
```bash
sudo yum install nginx
```

3. 启动Nginx
安装完毕后，可以通过执行以下命令来启动Nginx：

sudo systemctl start nginx
设置开机启动
为了确保Nginx在系统重启后自动启动，可以将其添加到系统服务中并设置开机启动。
```bash
sudo systemctl enable nginx
```

4. 防火墙设置
如果您的系统使用了防火墙，请确保已将Nginx添加到防火墙规则中，否则无法访问。
```bash
sudo firewall-cmd --permanent --zone=public --add-service=http
sudo firewall-cmd --reload
```
至此，Nginx已经成功安装在您的CentOS系统上。可以通过执行`sudo systemctl status nginx`命令来检查Nginx的状态，如果一切正常，您应该看到类似下面的输出：
```bash
● nginx.service - The nginx HTTP and reverse proxy server
   Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; vendor preset: disabled)
   Active: active (running) since Fri 2021-08-27 17:19:56 CST; 10s ago
 Main PID: 3417 (nginx)
   CGroup: /system.slice/nginx.service
           ├─3417 nginx: master process /usr/sbin/nginx -g daemon on; master_process on;
           └─3418 nginx: worker process
```

----------------------------------------------------------------------------------------------

***配置nginx***

1. 新建一个配置文件
在`/etc/nginx/conf.d/`目录下新建一个文件，例如`chat.markel.link.conf`，该文件将只包含 `chat.markel.link` 的配置。

`sudo vi /etc/nginx/conf.d/chat.markel.link.conf`
将配置文件中的代码复制并粘贴进去
将上面配置`chat.markel.link`的代码复制并粘贴到`chat.markel.link.conf`文件中。

```bash
server {
    listen 443 ssl;
    server_name chat.markel.link;

    ssl_certificate /path/to/your/cert.pem;
    ssl_certificate_key /path/to/your/key.pem;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        # 很重要，会影响流式输出的效果，参考：https://github.com/mckaywrigley/chatbot-ui/issues/211
        proxy_buffering off;
    }
}
```
请注意，`chat.markel.link.conf`文件中不必包含`http`和`server`块。这些块已经包含在主配置文件中。

2. 重新加载Nginx配置
执行以下命令重新加载Nginx配置：
```bash
sudo nginx -t
sudo systemctl reload nginx
```
现在，`chat.markel.link`的反向代理配置已经从主配置文件中单独抽出来，并存放在了`/etc/nginx/conf.d/chat.markel.link.conf`文件中。


## Configuration

When deploying the application, the following environment variables can be set:

| Environment Variable  | Default value                  | Description                                             |
| --------------------- | ------------------------------ | ------------------------------------------------------- |
| OPENAI_API_KEY        |                                | The default API key used for authentication with OpenAI |
| DEFAULT_MODEL         | `gpt-3.5-turbo`                | The default model to use on new conversations           |
| DEFAULT_SYSTEM_PROMPT | [see here](utils/app/const.ts) | The defaut system prompt to use on new conversations    |

If you do not provide an OpenAI API key with `OPENAI_API_KEY`, users will have to provide their own key.
If you don't have an OpenAI API key, you can get one [here](https://platform.openai.com/account/api-keys).

## Contact

If you have any questions, feel free to reach out to me on [Twitter](https://twitter.com/mckaywrigley).
