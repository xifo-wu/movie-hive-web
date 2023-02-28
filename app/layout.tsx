import "./globals.css";
import "@/css/slider.css";
import "@/css/slider-theme.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* TODO APP 目录正式上线后查看案例写法 */}
        {process.env.NODE_ENV === "production" && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VV14DY375Y', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />
        )}
        {children}
      </body>
    </html>
  );
}
