import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800">
      <div className="container max-w-7xl mx-auto px-4 pt-5 mt-10 pb-4 flex-wrap text-white flex content-between">
        <div className="flex-1 min-w-full md:min-w-0 text-sm text-slate-300">
          本站只提供 WEB
          页面服务，本站不存储、不制作任何视频，不承担任何由于内容的合法性及健康性所引起的争议和法律责任。
          若本站收录内容侵犯了您的权益，请联系说明，本站将第一时间处理。
        </div>
        <div className="flex-1 text-right mt-4">
          <h1>
            影巢 - HD Hive
            <span className="text-xs opacity-70">（v0.0.1.beta.3）</span>
          </h1>
          <p>© 2023 HD Hive All rights reservd.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
