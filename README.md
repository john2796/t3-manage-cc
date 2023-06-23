## Mange Course using t3 stack : next.js, nextAuth.js, tailwindcss, trpc, prisma

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Running local s3 using s3rver

```bash
🌐 >s3rver -h
Usage: s3rver -d <path> [options]

Options:
  -d, --directory <path>                  Data directory
  -a, --address <value>                   Hostname or IP to bind to (default: "localhost")
  -p, --port <n>                          Port of the http server (default: 4568)
  -s, --silent                            Suppress log messages (default: false)
  --key <path>                            Path to private key file for running with TLS
  --cert <path>                           Path to certificate file for running with TLS
  --service-endpoint <address>            Overrides the AWS service root for subdomain-style
                                          access (default: "amazonaws.com")
  --allow-mismatched-signatures           Prevent SignatureDoesNotMatch errors for all
                                          well-formed signatures
  --no-vhost-buckets                      Disables vhost-style access for all buckets
  --configure-bucket <name> [configs...]  Bucket name and configuration files for creating
                                          and configuring a bucket at startup
  -v, --version                           output the version number
  -h, --help                              display help for command

Examples:
  $ s3rver -d /tmp/s3rver -a 0.0.0.0 -p 0
  $ s3rver -d /tmp/s3rver --configure-bucket test-bucket ./cors.xml ./website.xml

 John_Miranda: ~/Desktop/t3-twitts [git:main]
🌐 >s3rver -d /tmp/s3rver --configure-bucket test-bucket ./cors.xml

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [ ] [Next.js Documentation](https://nextjs.org/docs) - [ ] learn about Next.js features and API.
- [ ] [Learn Next.js](https://nextjs.org/learn) - [ ] an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - [ ] your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
