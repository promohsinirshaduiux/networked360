'use client';

import { useRef, useState } from 'react';
import { ArrowUpRight, CheckCircle2, ChevronDown, Clock3, Lock, Mail, MapPin, Send } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Motion';
import { gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/cn';

const TOPICS = ['General question', 'Joining an event', 'Hosting an event', 'Partnerships', 'Press'];

const DETAILS = [
  { icon: Mail, label: 'Email', value: 'hello@networked360.com', href: 'mailto:hello@networked360.com' },
  { icon: MapPin, label: 'Where we meet', value: 'New York · New Jersey · Online' },
  { icon: Clock3, label: 'Response time', value: 'Within one business day' },
];

const fieldCls = (invalid?: boolean) =>
  cn(
    'peer w-full rounded-2xl border bg-paper/70 px-4 pt-6 pb-2.5 text-base text-ink outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-transparent hover:border-ink/25 focus:bg-white focus:shadow-[0_0_0_4px_rgb(0_159_216/0.1)]',
    invalid ? 'border-brand bg-brand-50/40' : 'border-line-2 focus:border-brand',
  );
const labelCls =
  'pointer-events-none absolute top-2 left-4 text-[0.75rem] font-semibold text-ink-4 transition-all duration-300 peer-placeholder-shown:top-[1.05rem] peer-placeholder-shown:text-[0.95rem] peer-placeholder-shown:font-normal peer-focus:top-2 peer-focus:text-[0.75rem] peer-focus:font-semibold peer-focus:text-brand';

function Field({ id, label, type = 'text', textarea, value, onChange, invalid }: { id: string; label: string; type?: string; textarea?: boolean; value: string; onChange: (v: string) => void; invalid?: boolean }) {
  return (
    <label htmlFor={id} className="relative block">
      {textarea ? (
        <textarea id={id} rows={5} placeholder={label} required value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={invalid} className={cn(fieldCls(invalid), 'resize-none')} />
      ) : (
        <input id={id} type={type} placeholder={label} required value={value} onChange={(e) => onChange(e.target.value)} aria-invalid={invalid} className={fieldCls(invalid)} autoComplete={type === 'email' ? 'email' : 'name'} />
      )}
      <span className={labelCls}>{label}</span>
    </label>
  );
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', topic: TOPICS[0], message: '' });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);

  const { contextSafe } = useGSAP({ scope: ref });

  const submit = contextSafe((e: React.FormEvent) => {
    e.preventDefault();
    const next = {
      name: !form.name.trim(),
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
      message: form.message.trim().length < 5,
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) {
      gsap.fromTo('[data-form]', { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      return;
    }
    setSent(true);
    requestAnimationFrame(() => gsap.from('[data-sent] > *', { y: 20, opacity: 0, stagger: 0.08, duration: 0.8, ease: 'expo.out' }));
  });

  const set = (k: keyof typeof form) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: false }));
  };

  return (
    <section ref={ref} id="contact" className="relative py-20 md:py-32">
      <div aria-hidden className="absolute top-24 -left-40 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,#d9f1fa,transparent)] opacity-80" />
      <div className="container-x relative grid grid-cols-1 items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <SectionHeading
            eyebrow="Contact us"
            title={
              <>
                Let’s <em className="text-gradient">talk.</em>
              </>
            }
            lead="Questions about a room, hosting an event or partnering with us? A real person will get back to you."
            className="mb-8 md:mb-10"
          />
          <Reveal className="overflow-hidden rounded-[26px] border border-line bg-white/80 shadow-soft backdrop-blur">
            {DETAILS.map(({ icon: Icon, label, value, href }, k) => {
              const inner = (
                <>
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-4">{label}</span>
                    <span className="block truncate text-[1rem] font-medium text-ink">{value}</span>
                  </span>
                  {href && <ArrowUpRight className="h-4 w-4 text-ink-4 transition-colors group-hover:text-brand" />}
                </>
              );
              const cls = cn('group flex items-center gap-4 px-5 py-4', k > 0 && 'border-t border-line');
              return href ? (
                <a key={label} href={href} className={cn(cls, 'transition-colors hover:bg-brand-50/50')}>
                  {inner}
                </a>
              ) : (
                <div key={label} className={cls}>
                  {inner}
                </div>
              );
            })}
          </Reveal>
        </div>

        <Reveal y={40}>
          <div className="relative overflow-hidden rounded-[36px] border border-line bg-white p-6 shadow-lift sm:p-10">
            <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-brand-gradient" />
            {sent ? (
              <div data-sent className="relative grid min-h-[520px] place-items-center content-center gap-4 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-white shadow-brand">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <p className="font-display font-bold text-[1.9rem] leading-tight tracking-[-0.02em] text-ink">Message sent.</p>
                <p className="max-w-[36ch] text-ink-3">
                  Thanks, {form.name.split(' ')[0]}. We’ll reply to {form.email} within one business day.
                </p>
              </div>
            ) : (
              <form data-form onSubmit={submit} noValidate className="relative grid gap-4">
                <div className="mb-2 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="font-display font-bold text-[1.45rem] leading-tight tracking-[-0.02em] text-ink">Send us a message</p>
                    <p className="mt-1 text-[0.92rem] text-ink-3">All fields are required.</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-mint-50 px-3 py-1.5 text-[0.78rem] font-semibold text-mint">
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-mint" /> Usually replies in a day
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="c-name" label="Name" value={form.name} onChange={set('name')} invalid={errors.name} />
                  <Field id="c-email" label="Email" type="email" value={form.email} onChange={set('email')} invalid={errors.email} />
                </div>

                <label htmlFor="c-topic" className="relative block">
                  <select id="c-topic" value={form.topic} onChange={(e) => set('topic')(e.target.value)} className={cn(fieldCls(), 'cursor-pointer appearance-none pr-12')}>
                    {TOPICS.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute top-2 left-4 text-[0.75rem] font-semibold text-ink-4 peer-focus:text-brand">Topic</span>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-ink-3" />
                </label>

                <Field id="c-msg" label="Message" textarea value={form.message} onChange={set('message')} invalid={errors.message} />

                {Object.values(errors).some(Boolean) && (
                  <p role="alert" className="text-[0.85rem] font-medium text-brand">
                    Please add your name, a valid email and a short message.
                  </p>
                )}

                <div className="mt-2 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="inline-flex items-center gap-2 text-[0.84rem] text-ink-4">
                    <Lock className="h-3.5 w-3.5" /> We never share your details.
                  </p>
                  <button
                    type="submit"
                    className="group/btn relative isolate inline-flex h-14 items-center justify-center gap-2.5 overflow-hidden rounded-full bg-brand px-8 font-semibold text-white shadow-brand after:absolute after:inset-0 after:-z-10 after:translate-y-full after:bg-brand-700 after:transition-transform after:duration-500 after:ease-[var(--ease-expo)] hover:after:translate-y-0"
                  >
                    Send message <Send className="h-4 w-4 transition-transform duration-500 group-hover/btn:rotate-12" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
