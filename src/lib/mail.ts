import { EMAIL_TEMPLATES, EmailTemplate } from "@/components/email-templates";
import { render } from "@react-email/components";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace Mail {
  export type EmailOptions = {
    to: string[];
    subject: string;
    html: string;
  };
}

class Mail {
  private service: string;

  constructor() {
    this.service = process.env.EMAIL_SERVICE as string;
  }

  async send(options: { to: string; subject: string; body: string }) {
    const res = await fetch(this.service, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(options),
    });

    return res.json();
  }

  getTemplate(template: EmailTemplate) {
    return EMAIL_TEMPLATES[template];
  }

  renderTemplate<T extends EmailTemplate>(
    template: T,
    data: React.ComponentProps<(typeof EMAIL_TEMPLATES)[T]>
  ) {
    const Template = this.getTemplate(template);
    // @ts-expect-error:................
    return render(React.createElement(Template, data));
  }

  async sendTemplate<T extends EmailTemplate>(
    template: T,
    data: React.ComponentProps<(typeof EMAIL_TEMPLATES)[T]>,
    options: { to: string; subject: string }
  ) {
    const html = await this.renderTemplate(template, data);
    return this.send({ ...options, body: html });
  }
}

export const mail = new Mail();
