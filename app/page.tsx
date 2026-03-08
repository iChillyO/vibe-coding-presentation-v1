"use client";

import FullPageWrapper, { Section, Slide } from "@/components/FullPageWrapper";
import { Motion3D, ContentReveal } from "@/components/Motion3D";
import { BackgroundDecor } from "@/components/BackgroundDecor";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IQuestion } from "@/models/Question";
import {
    ArrowDown, MessageSquare, Terminal, Layers, Cpu, Shield, Zap, Search,
    Code, Layout, Rocket, Info, CheckCircle2, AlertTriangle, BookOpen, X, Send, User, Clock
} from "lucide-react";
import { IAnswer } from "@/models/Answer";

export default function Home() {
    const [activeSection, setActiveSection] = useState(0);
    const [question, setQuestion] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    // Detail View State
    const [selectedQuestion, setSelectedQuestion] = useState<IQuestion | null>(null);
    const [answers, setAnswers] = useState<IAnswer[]>([]);
    const [answerText, setAnswerText] = useState("");
    const [answerAuthor, setAnswerAuthor] = useState("");
    const [ansStatus, setAnsStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const fetchQuestions = async () => {
        try {
            const res = await fetch("/api/questions");
            const json = await res.json();
            if (json.success) setQuestions(json.data);
        } catch (err) {
            console.error("Failed to fetch questions", err);
        }
    };

    const fetchAnswers = async (qId: string) => {
        try {
            const res = await fetch(`/api/questions/${qId}/answers`);
            const json = await res.json();
            if (json.success) setAnswers(json.data);
        } catch (err) {
            console.error("Failed to fetch answers", err);
        }
    };

    useEffect(() => {
        fetchQuestions();
        const interval = setInterval(fetchQuestions, 10000); // Polling every 10s
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (selectedQuestion?._id) {
            fetchAnswers(selectedQuestion._id);
        }
    }, [selectedQuestion]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return setErrorMsg("يرجى كتابة السؤال");
        if (!authorName.trim()) return setErrorMsg("الاسم مطلوب");

        setErrorMsg("");
        setStatus("submitting");
        try {
            const res = await fetch("/api/questions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: question, authorName }),
            });
            if (res.ok) {
                setQuestion("");
                setAuthorName("");
                setStatus("success");
                fetchQuestions();
                setTimeout(() => setStatus("idle"), 3000);
            } else {
                setStatus("error");
            }
        } catch (err) {
            setStatus("error");
        }
    };

    const handleAnswerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedQuestion?._id) return;
        if (!answerText.trim() || !answerAuthor.trim()) return;

        setAnsStatus("submitting");
        try {
            const res = await fetch(`/api/questions/${selectedQuestion._id}/answers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: answerText, authorName: answerAuthor }),
            });
            if (res.ok) {
                setAnswerText("");
                setAnsStatus("success");
                fetchAnswers(selectedQuestion._id);
                setTimeout(() => setAnsStatus("idle"), 3000);
            } else {
                setAnsStatus("error");
            }
        } catch (err) {
            setAnsStatus("error");
        }
    };

    return (
        <main className="relative font-almarai overflow-x-hidden">
            {/* Desktop Recommendation Banner - Mobile Only */}
            <div className="lg:hidden fixed top-0 w-full z-[9999] bg-lapis/20 backdrop-blur-md border-b border-lapis/30 py-2 px-4 text-center">
                <p className="text-xs md:text-sm text-text-primary flex items-center justify-center gap-2">
                    <AlertTriangle size={14} className="text-lapis-light shrink-0" />
                    <span>لأفضل تجربة وعرض كامل، يُنصح بتصفح الموقع عبر جهاز كمبيوتر</span>
                </p>
            </div>

            {/* Global Watermark */}
            <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[9999] pointer-events-none opacity-50 flex items-center gap-2">
                <span className="text-[10px] md:text-xs text-text-primary font-bold tracking-widest uppercase bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/5 shadow-2xl">
                    شرف حازم فرج الله
                </span>
            </div>

            <BackgroundDecor activeSection={activeSection} />
            <div className="noise-overlay" />
            <div className="radial-lighting" />

            <FullPageWrapper onSectionChange={(idx) => setActiveSection(idx)}>
                {/* 1. HERO / TITLE */}
                <Section id="hero">
                    <div className="max-w-6xl w-full z-10 flex flex-col items-center">
                        <Motion3D side="right" delay={0.2}>
                            <h1 className="heading-massive mb-6 text-center">
                                <span className="glow-lapis font-black">Vibe Coding</span>
                                <br />
                                <span className="text-text-primary text-3xl md:text-5xl lg:text-6xl">أنت توجّه... والذكاء الاصطناعي يكتب</span>
                            </h1>
                        </Motion3D>

                        <ContentReveal delay={0.6}>
                            <p className="text-xl md:text-2xl text-text-secondary max-w-4xl text-center leading-relaxed mb-8">
                                أسلوب حديث في تطوير البرمجيات، يعتمد على وصف الفكرة بلغة طبيعية، ثم تحويلها إلى كود وتجربة قابلة للتنفيذ.
                            </p>
                        </ContentReveal>

                        <ContentReveal delay={0.9}>
                            <p className="text-lg md:text-xl text-lapis-light font-bold uppercase tracking-widest text-center border-y border-white/5 py-4 px-6 md:px-12">
                                لم تعد البرمجة مجرد كتابة أوامر... بل أصبحت فنّ التوجيه وبناء الفكرة.
                            </p>
                        </ContentReveal>

                        <ContentReveal delay={1.4} className="mt-20">
                            <div className="flex flex-col items-center gap-2 opacity-40 animate-bounce">
                                <span className="text-xs uppercase tracking-[0.3em]">انزل للأسفل</span>
                                <ArrowDown size={20} />
                            </div>
                        </ContentReveal>
                    </div>
                </Section>

                {/* 2. WHAT IS VIBE CODING? */}
                <Section id="what-is">
                    <div className="max-w-6xl w-full px-8">
                        <ContentReveal>
                            <h2 className="heading-section text-lapis-light text-center mb-16">ما هو Vibe Coding؟</h2>
                            <div className="glass-panel p-6 md:p-16 border-r-8 border-lapis bg-slate-900/40 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <Info size={120} />
                                </div>
                                <p className="text-xl md:text-3xl text-text-primary leading-relaxed mb-12 text-right">
                                    الـ Vibe Coding هو أسلوب حديث في بناء البرمجيات، حيث يصف المطور الفكرة أو الواجهة أو السلوك المطلوب بلغة طبيعية، ثم يتولى الذكاء الاصطناعي توليد جزء كبير من الكود. بدل أن تبدأ من الصفر، تبدأ من الرؤية.
                                </p>
                                <div className="grid md:grid-cols-2 gap-8 text-right">
                                    {[
                                        "تصف الفكرة بدل كتابة كل شيء يدويًا",
                                        "الذكاء الاصطناعي يولّد الكود الأولي",
                                        "التعديل يتم بالحوار والتحسين المستمر",
                                        "التركيز ينتقل من كتابة السطور إلى قيادة المنتج"
                                    ].map((point, i) => (
                                        <div key={i} className="flex items-center gap-4 justify-start text-text-secondary text-lg">
                                            <CheckCircle2 size={24} className="text-lapis shrink-0" />
                                            <span>{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ContentReveal>
                    </div>
                </Section>

                {/* 3. HOW DOES IT WORK? */}
                <Section id="how-it-works">
                    <div className="max-w-7xl w-full px-8">
                        <ContentReveal>
                            <h2 className="heading-section text-center mb-20 text-text-primary underline decoration-lapis decoration-4 underline-offset-12">كيف تعمل هذه الفكرة؟</h2>
                        </ContentReveal>

                        <div className="grid md:grid-cols-4 gap-6">
                            {[
                                { title: "وصف الفكرة", desc: "تبدأ بكتابة ما تتخيله: واجهة، سلوك، ألوان، أقسام، أو حتى تجربة كاملة.", icon: <MessageSquare /> },
                                { title: "توليد الكود", desc: "يقوم الذكاء الاصطناعي باقتراح الكود الأولي أو بناء صفحات ومكونات جاهزة.", icon: <Terminal /> },
                                { title: "المراجعة والتعديل", desc: "تراجع الناتج، وتطلب تحسينات أو تعديلات حتى يصبح أقرب لما تريد.", icon: <Search /> },
                                { title: "الاختبار والتحسين", desc: "بعد الحصول على نسخة تعمل، تبدأ مرحلة الفحص، الإصلاح، وتنظيم التجربة.", icon: <Shield /> }
                            ].map((step, idx) => (
                                <Motion3D key={idx} side={idx % 2 === 0 ? "right" : "left"} delay={idx * 0.15}>
                                    <div className="glass-panel p-6 md:p-8 h-full border-t border-lapis/20 group hover:bg-lapis/5 transition-colors flex flex-col items-start text-right">
                                        <div className="mb-6 text-lapis opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all self-start">
                                            {step.icon}
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 text-right w-full">{step.title}</h3>
                                        <p className="text-text-secondary text-sm leading-relaxed text-right w-full">{step.desc}</p>
                                        <div className="mt-8 text-xs font-black text-lapis/40 uppercase tracking-widest w-full">المرحلة 0{idx + 1}</div>
                                    </div>
                                </Motion3D>
                            ))}
                        </div>

                        <ContentReveal delay={0.8} className="mt-16 text-center">
                            <div className="inline-block p-6 glass-panel border border-white/5 bg-slate-900/60 max-w-2xl">
                                <p className="text-text-muted text-sm italic mb-2">مثال سريع:</p>
                                <p className="text-text-primary font-mono text-sm leading-relaxed">
                                    "أنشئ موقع عرض تفاعلي عن Vibe Coding بتصميم داكن، وأقسام متحركة، ونموذج أسئلة مباشر."
                                </p>
                            </div>
                        </ContentReveal>
                    </div>
                </Section>

                {/* 4. TOOLS BEHIND */}
                <Section id="tools-vibe">
                    <div className="max-w-6xl w-full px-8">
                        <ContentReveal>
                            <h2 className="heading-section text-center mb-16 text-text-primary">ما الأدوات التي تدعم Vibe Coding؟</h2>
                            <p className="text-xl text-text-secondary text-center max-w-3xl mx-auto mb-20 leading-relaxed">
                                نجاح هذا الأسلوب لا يعتمد على الذكاء الاصطناعي وحده، بل على الأدوات التي تساعد في توليد الكود ونشر المنتج بشكل حي.
                            </p>
                        </ContentReveal>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                { title: "مساعدات الذكاء الاصطناعي", desc: "مثل Cursor وGitHub Copilot وغيرها، وهي تساعد في اقتراح الكود وبناء المكونات وتسريع التنفيذ.", icon: <Cpu />, color: "text-lapis" },
                                { title: "بيئات التطوير", desc: "المحررات والأدوات التي تسمح لك ببناء المشروع، مراجعة الملفات، وتشغيل التطبيق محليًا.", icon: <Terminal />, color: "text-neon-purple" },
                                { title: "أطر الواجهة", desc: "مثل Next.js وReact وTailwind CSS، وهي التي تحوّل الفكرة إلى تجربة مرئية حقيقية.", icon: <Layout />, color: "text-neon-cyan" },
                                { title: "قواعد البيانات والنشر", desc: "مثل MongoDB وVercel، وتُستخدم لتخزين البيانات ونشر المشروع على الويب.", icon: <Rocket />, color: "text-lapis" }
                            ].map((tool, idx) => (
                                <Motion3D key={idx} side={idx % 2 === 0 ? "right" : "left"} delay={idx * 0.15}>
                                    <div className="glass-panel p-6 md:p-10 flex flex-row-reverse gap-8 items-start hover:bg-slate-900/60 transition-all border-l-2 border-transparent hover:border-lapis">
                                        <div className={`${tool.color} p-4 bg-white/5 rounded-2xl`}>
                                            {tool.icon}
                                        </div>
                                        <div className="text-right flex-1">
                                            <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-3">{tool.title}</h3>
                                            <p className="text-text-secondary leading-relaxed">{tool.desc}</p>
                                        </div>
                                    </div>
                                </Motion3D>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* 5. HOW THIS WEBSITE WAS BUILT */}
                <Section id="how-this-site">
                    <div className="max-w-6xl w-full px-8">
                        <ContentReveal>
                            <h2 className="heading-section text-center mb-20 text-text-primary tracking-tight">كيف تم بناء هذا الموقع؟</h2>
                        </ContentReveal>

                        <div className="relative border-r-2 border-lapis/20 pr-8 md:pr-12 space-y-16">
                            {[
                                { title: "1) تحديد الفكرة", desc: "تم اختيار موضوع Vibe Coding، ثم تحويله من مجرد محتوى نظري إلى تجربة عرض حيّة وتفاعلية." },
                                { title: "2) تصميم الهيكل", desc: "تم تقسيم المحتوى إلى أقسام واضحة، بحيث يعمل كل قسم كأنه شريحة مستقلة داخل تجربة عرض كاملة." },
                                { title: "3) اختيار الأدوات", desc: "تم استخدام Next.js لبنية المشروع، وTailwind CSS للتصميم، وFramer Motion للحركات، وMongoDB للأسئلة المباشرة." },
                                { title: "4) بناء الواجهة", desc: "تم إنشاء أقسام العرض، وتنسيقها بتصميم داكن، وإضافة حركات دخول وخلفيات بصرية تعطي إحساسًا سينمائيًا." },
                                { title: "5) إضافة التفاعل", desc: "في النهاية، تم ربط نموذج الأسئلة بقاعدة البيانات ليصبح العرض تفاعليًا، وليس مجرد محتوى ثابت." }
                            ].map((item, idx) => (
                                <Motion3D key={idx} side="left" delay={idx * 0.2}>
                                    <div className="relative text-right">
                                        <div className="absolute top-0 right-[-45px] md:right-[-61px] w-6 h-6 rounded-full bg-lapis border-4 border-background animate-pulse" />
                                        <h3 className="text-xl md:text-2xl font-black mb-4 text-text-primary text-right">{item.title}</h3>
                                        <p className="text-base md:text-lg text-text-secondary leading-relaxed text-right">{item.desc}</p>
                                    </div>
                                </Motion3D>
                            ))}
                        </div>

                        <ContentReveal delay={1.2} className="mt-20 text-center">
                            <p className="text-lapis-light font-bold text-lg border border-lapis/20 px-8 py-4 rounded-xl inline-block bg-lapis/5">
                                بهذا الشكل، يتحول العرض من شرائح جامدة إلى تجربة ويب حيّة.
                            </p>
                        </ContentReveal>
                    </div>
                </Section>

                {/* 6. PROJECT STACK */}
                <Section id="stack">
                    <div className="max-w-7xl w-full px-8">
                        <ContentReveal>
                            <h2 className="heading-section text-center mb-16 text-text-primary">الأدوات التي بُني بها هذا المشروع</h2>
                        </ContentReveal>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                            {[
                                { name: "Next.js", role: "بنية التطبيق", color: "border-lapis" },
                                { name: "React", role: "بناء الواجهات", color: "border-neon-cyan" },
                                { name: "TypeScript", role: "تنظيم الكود", color: "border-lapis" },
                                { name: "Tailwind CSS", role: "تنسيق سريع", color: "border-neon-purple" },
                                { name: "Framer Motion", role: "الحركات", color: "border-lapis" },
                                { name: "FullPage.js", role: "تجربة الشرائح", color: "border-neon-cyan" },
                                { name: "MongoDB", role: "تخزين الأسئلة", color: "border-lapis" },
                                { name: "Mongoose", role: "إدارة البيانات", color: "border-neon-purple" },
                                { name: "Vercel", role: "النشر", color: "border-lapis" },
                            ].map((item, idx) => (
                                <Motion3D key={idx} side={idx % 2 === 0 ? "right" : "left"} delay={idx * 0.05}>
                                    <div className={`glass-panel p-6 flex flex-col items-center border-b-4 ${item.color} group hover:bg-slate-900/60 transition-all cursor-default`}>
                                        <span className="text-text-primary font-bold mb-1 group-hover:scale-110 transition-transform">{item.name}</span>
                                        <span className="text-[10px] text-text-muted uppercase tracking-widest">{item.role}</span>
                                    </div>
                                </Motion3D>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* 7. WHY POWERFUL */}
                <Section id="power">
                    <div className="max-w-6xl w-full px-8 text-right">
                        <ContentReveal>
                            <h2 className="heading-section text-center mb-16 text-text-primary">لماذا أصبح Vibe Coding مهمًا؟</h2>
                        </ContentReveal>

                        <div className="grid md:grid-cols-2 gap-8">
                            {[
                                { title: "سرعة أعلى", desc: "بدل قضاء وقت طويل في كتابة كل التفاصيل من البداية، يمكنك الوصول إلى نموذج أولي بسرعة كبيرة.", icon: <Zap /> },
                                { title: "مساعدة للإبداع", desc: "عندما تقلّ التفاصيل المتكررة، يصبح التركيز أكبر على الفكرة، والتجربة، وشكل المنتج النهائي.", icon: <Rocket /> },
                                { title: "سهولة في التجريب", desc: "يمكن تجربة أكثر من اتجاه تصميمي أو وظيفي خلال وقت قصير جدًا.", icon: <CheckCircle2 /> },
                                { title: "بداية أسهل", desc: "يساعد المبتدئين على الدخول إلى عالم البناء البرمجي بطريقة أسرع وأكثر وضوحًا.", icon: <BookOpen /> }
                            ].map((card, idx) => (
                                <Motion3D key={idx} side={idx % 2 === 0 ? "right" : "left"} delay={idx * 0.2}>
                                    <div className="glass-panel p-6 md:p-10 flex flex-col items-start border-r-4 border-lapis/50 hover:bg-lapis/5 transition-all text-right">
                                        <div className="text-lapis mb-6 bg-lapis/10 p-4 rounded-full self-start">{card.icon}</div>
                                        <h3 className="text-xl md:text-2xl font-black mb-4 text-text-primary w-full text-right">{card.title}</h3>
                                        <p className="text-text-secondary leading-relaxed w-full text-right">{card.desc}</p>
                                    </div>
                                </Motion3D>
                            ))}
                        </div>
                    </div>
                </Section>

                {/* 8. FUNDAMENTALS */}
                <Section id="fundamentals">
                    <div className="max-w-6xl w-full px-8">
                        <ContentReveal>
                            <h2 className="heading-section text-center mb-16 text-text-primary">لكن... الأساسيات ما زالت تحكم</h2>
                            <p className="text-xl text-text-secondary text-center max-w-3xl mx-auto mb-20 leading-relaxed">
                                رغم قوة الذكاء الاصطناعي في التوليد، إلا أن الفهم الحقيقي للمشروع هو ما يصنع الجودة والاستقرار.
                            </p>
                        </ContentReveal>

                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { title: "Architecture", desc: "الهندسة الجيدة تجعل المشروع قابلًا للتوسعة والصيانة، وليس فقط قابلًا للتشغيل." },
                                { title: "State", desc: "فهم الحالة داخل التطبيق ضروري للحفاظ على تجربة مستقرة وواضحة." },
                                { title: "Debugging", desc: "عند حدوث خطأ، يجب أن تعرف كيف تبحث عنه وتفهم سببه، لا أن تعتمد فقط على التوليد." },
                                { title: "Performance", desc: "الموقع الجيد ليس فقط ما يعمل، بل ما يعمل بسلاسة وكفاءة." },
                                { title: "Security", desc: "أي مشروع حقيقي يحتاج إلى وعي أمني، خصوصًا عند التعامل مع البيانات والاتصالات." }
                            ].map((item, idx) => (
                                <Motion3D key={idx} side={idx % 2 === 0 ? "right" : "left"} delay={idx * 0.1}>
                                    <div className="glass-panel p-6 md:p-8 h-full border-t border-white/5 relative group hover:bg-slate-900/60 flex flex-col items-start text-right">
                                        <div className="text-xs text-neon-purple font-mono mb-4 text-right w-full">0{idx + 1}_LOGIC</div>
                                        <h3 className="text-xl font-bold mb-4 text-text-primary transition-colors group-hover:text-neon-cyan text-right w-full">{item.title}</h3>
                                        <p className="text-text-secondary text-sm leading-relaxed text-right w-full">{item.desc}</p>
                                    </div>
                                </Motion3D>
                            ))}
                        </div>

                        <ContentReveal delay={1} className="mt-16 text-center">
                            <p className="text-text-muted italic">"الذكاء الاصطناعي يسرّع الطريق... لكن الفهم الهندسي هو من يحدد الاتجاه."</p>
                        </ContentReveal>
                    </div>
                </Section>

                {/* 9. LIVE Q&A */}
                <Section id="qa">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-7xl w-full px-8 items-start">
                        <Motion3D side="right">
                            <div className="glass-panel p-6 md:p-10 text-right border-r-4 border-lapis/50 bg-slate-900/60 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-lapis/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <h2 className="text-3xl md:text-5xl font-black mb-10 uppercase text-text-primary tracking-tighter glow-lapis">اسأل المهندس</h2>

                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                    <div className="space-y-2">
                                        <label className="text-xs text-text-muted mr-2">سؤالك</label>
                                        <textarea
                                            className="w-full bg-background/50 border border-white/10 rounded-2xl p-4 md:p-5 text-text-primary focus:border-lapis focus:ring-1 focus:ring-lapis/50 outline-none transition-all resize-none h-40 placeholder:text-text-muted/40 text-sm md:text-base"
                                            placeholder="اكتب سؤالك هنا..."
                                            required
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs text-text-muted mr-2">اسمك</label>
                                        <input
                                            type="text"
                                            className="w-full bg-background/50 border border-white/10 rounded-2xl p-4 md:p-5 text-text-primary focus:border-lapis focus:ring-1 focus:ring-lapis/50 outline-none transition-all placeholder:text-text-muted/40 text-sm md:text-base"
                                            placeholder="اسمك"
                                            required
                                            value={authorName}
                                            onChange={(e) => setAuthorName(e.target.value)}
                                        />
                                    </div>

                                    {errorMsg && (
                                        <p className="text-neon-purple text-xs text-center font-bold animate-pulse">{errorMsg}</p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="w-full bg-lapis hover:bg-lapis/80 text-white py-4 rounded-2xl font-black uppercase text-lg md:text-xl transition-all shadow-[0_0_25px_rgba(37,99,235,0.4)] disabled:opacity-50 relative overflow-hidden group"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-4">
                                            {status === "submitting" ? "جاري الإرسال..." : "إرسال السؤال"}
                                            <MessageSquare size={20} />
                                        </span>
                                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    </button>

                                    {status === "success" && (
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lapis-light text-sm text-center font-bold">
                                            تم إرسال السؤال بنجاح
                                        </motion.p>
                                    )}
                                </form>
                            </div>
                        </Motion3D>

                        <Motion3D side="left" delay={0.3}>
                            <div className="h-[500px] md:h-[650px] flex flex-col glass-panel p-0 md:p-2 border-white/5">
                                <div className="p-6 md:p-8 border-b border-white/5 flex flex-row-reverse justify-between items-center">
                                    <h3 className="text-lg md:text-xl font-black uppercase text-text-primary tracking-tighter flex flex-row-reverse items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-lapis animate-pulse" />
                                        <span>الأسئلة المباشرة</span>
                                    </h3>
                                    <Search size={18} className="text-text-muted opacity-40" />
                                </div>

                                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-hide">
                                    <AnimatePresence mode="popLayout">
                                        {questions.length === 0 ? (
                                            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center py-20 opacity-20 text-center">
                                                <MessageSquare size={60} className="mb-6" />
                                                <p className="italic text-lg">لا توجد أسئلة بعد. كن أول من يبدأ.</p>
                                            </motion.div>
                                        ) : (
                                            questions.map((q, qIdx) => (
                                                <motion.div
                                                    key={q._id || qIdx}
                                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                    onClick={() => setSelectedQuestion(q)}
                                                    className="glass-panel p-4 md:p-6 border-white/5 hover:bg-lapis/10 transition-all cursor-pointer group"
                                                >
                                                    <p className="text-text-primary text-base md:text-lg mb-4 leading-relaxed group-hover:text-lapis-light transition-colors">{q.text}</p>
                                                    <div className="flex flex-row-reverse justify-between items-center opacity-40 border-t border-white/5 pt-4">
                                                        <span className="text-xs text-lapis-light font-bold flex flex-row-reverse items-center gap-2">
                                                            <User size={12} />
                                                            {q.authorName}
                                                        </span>
                                                        <span className="text-[10px] font-mono flex flex-row-reverse items-center gap-1">
                                                            <Clock size={10} />
                                                            {new Date(q.createdAt).toLocaleTimeString('ar-EG')}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            ))
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className="p-4 bg-lapis/5 border-t border-white/5 text-center">
                                    <p className="text-[10px] text-lapis-light uppercase tracking-widest font-black">اضغط على السؤال لعرض التفاصيل والإجابات</p>
                                </div>
                            </div>
                        </Motion3D>
                    </div>
                </Section>

                {/* 10. CLOSING */}
                <Section id="closing">
                    <div className="max-w-6xl w-full z-10 flex flex-col items-center text-center">
                        <Motion3D side="right" delay={0.2}>
                            <h2 className="heading-massive glow-lapis mb-8">الخاتمة</h2>
                        </Motion3D>

                        <ContentReveal delay={0.6} className="max-w-3xl border-r-4 border-lapis pr-6 md:pr-12 text-right">
                            <p className="text-xl md:text-3xl text-text-primary leading-relaxed mb-12">
                                الـ Vibe Coding لا يلغي دور المطور، لكنه يغيّر طريقته في العمل. بدل التركيز الكامل على كتابة كل سطر، يصبح التركيز على الفكرة، والتوجيه، والمراجعة، واتخاذ القرار الصحيح.
                            </p>
                            <div className="space-y-4">
                                <p className="text-xl text-lapis-light font-black uppercase tracking-widest">
                                    المستقبل ليس فقط لمن يكتب الكود... بل لمن يعرف كيف يوجّه بناءه.
                                </p>
                                <p className="text-text-muted">من الفكرة إلى المنتج... بسرعة، لكن بوعي.</p>
                            </div>
                        </ContentReveal>

                        <ContentReveal delay={1.4} className="mt-20">
                            <button onClick={() => window.location.reload()} className="px-10 py-4 glass-panel border border-lapis/30 text-lapis-light font-bold hover:bg-lapis/10 transition-colors uppercase tracking-widest">
                                إعادة العرض
                            </button>
                        </ContentReveal>
                    </div>
                </Section>
            </FullPageWrapper>

            {/* QUESTION DETAIL MODAL */}
            <AnimatePresence>
                {selectedQuestion && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 backdrop-blur-xl bg-black/80"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="glass-panel w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border-white/10 shadow-2xl relative"
                        >
                            <button
                                onClick={() => setSelectedQuestion(null)}
                                className="absolute top-4 left-4 md:top-6 md:left-6 text-text-muted hover:text-white transition-colors z-10"
                            >
                                <X size={28} />
                            </button>

                            <div className="p-6 md:p-12 border-b border-white/5 bg-gradient-to-b from-lapis/10 to-transparent">
                                <div className="text-xs text-lapis-light font-black uppercase tracking-[0.3em] mb-4">السؤال</div>
                                <h2 className="text-xl md:text-4xl font-bold text-text-primary text-right leading-tight mb-8">
                                    {selectedQuestion.text}
                                </h2>
                                <div className="flex justify-end items-center gap-4 text-text-muted">
                                    <span className="text-sm font-bold text-lapis-light text-right">{selectedQuestion.authorName}</span>
                                    <User size={18} />
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-8 min-h-[300px] scrollbar-hide">
                                <div className="text-right">
                                    <h3 className="text-xl font-bold text-text-primary mb-6 flex items-center justify-end gap-3">
                                        الإجابات
                                        <div className="w-1.5 h-1.5 rounded-full bg-neon-purple animate-pulse" />
                                    </h3>

                                    {answers.length === 0 ? (
                                        <p className="text-text-muted italic opacity-40">لا توجد إجابات بعد.</p>
                                    ) : (
                                        <div className="space-y-6">
                                            {answers.map((ans, idx) => (
                                                <motion.div
                                                    key={ans._id || idx}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="bg-white/5 border border-white/5 p-6 rounded-2xl relative"
                                                >
                                                    <p className="text-text-primary mb-3 leading-relaxed">{ans.text}</p>
                                                    <div className="text-[10px] text-lapis-light font-black uppercase flex flex-row-reverse items-center justify-start gap-2 opacity-60">
                                                        <User size={10} />
                                                        {ans.authorName}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 md:p-12 border-t border-white/10 bg-black/40">
                                <form onSubmit={handleAnswerSubmit} className="space-y-4">
                                    <div className="grid md:grid-cols-[1fr_200px] gap-4">
                                        <input
                                            type="text"
                                            placeholder="اكتب إجابتك..."
                                            className="bg-white/5 border border-white/10 rounded-xl p-4 text-text-primary focus:border-lapis outline-none transition-all text-right"
                                            value={answerText}
                                            onChange={(e) => setAnswerText(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="اسمك"
                                            className="bg-white/5 border border-white/10 rounded-xl p-4 text-text-primary focus:border-lapis outline-none transition-all text-right"
                                            value={answerAuthor}
                                            onChange={(e) => setAnswerAuthor(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={ansStatus === "submitting"}
                                        className="w-full bg-lapis text-white font-bold py-4 rounded-xl flex flex-row-reverse items-center justify-center gap-3 hover:bg-lapis/80 transition-all disabled:opacity-50"
                                    >
                                        <Send size={18} />
                                        {ansStatus === "submitting" ? "جاري الإرسال..." : "إرسال الإجابة"}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
