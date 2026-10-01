"use client";

import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Clock3,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  MousePointer2,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";

import logoAsset from "@/assets/la-dona-logo-oficial.jpg.asset.json";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  ["Início", "#inicio"],
  ["Cardápio", "#cardapio"],
  ["Sobre", "#sobre"],
  ["Avaliações", "#avaliacoes"],
  ["Contato", "#contato"],
] as const;

const categories = ["Hambúrgueres", "Combos", "Porções", "Bebidas", "Sobremesas"] as const;

function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="La Dona Hamburgueria"
      width={1024}
      height={999}
      className={className}
      decoding="async"
    />
  );
}

function OrderButton({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Button asChild variant="hero" size={compact ? "default" : "xl"} className={className}>
      <a href="#contato" aria-label="Ir para os canais de pedido da La Dona">
        <MessageCircle aria-hidden="true" />
        Pedir agora
      </a>
    </Button>
  );
}

function SectionIntro({
  index,
  kicker,
  title,
  body,
}: {
  index: string;
  kicker: string;
  title: string;
  body: string;
}) {
  return (
    <div className="section-intro reveal">
      <div className="section-kicker">
        <span>{index}</span>
        <span>{kicker}</span>
      </div>
      <div className="section-heading-grid">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-header-inner">
        <a href="#inicio" className="brand-lockup" aria-label="La Dona Hamburgueria — início">
          <Logo className="header-logo" />
          <span className="brand-wordmark">LA DONA</span>
        </a>

        <nav aria-label="Navegação principal" className="desktop-nav">
          {navItems.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <OrderButton compact className="desktop-order" />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="nav" size="iconLg" className="mobile-menu-button" aria-label="Abrir menu">
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent className="mobile-sheet">
              <SheetHeader className="mobile-sheet-header">
                <Logo className="mobile-sheet-logo" />
                <div>
                  <SheetTitle className="mobile-sheet-title">La Dona</SheetTitle>
                  <SheetDescription>Hamburgueria</SheetDescription>
                </div>
              </SheetHeader>
              <nav aria-label="Navegação mobile" className="mobile-nav">
                {navItems.map(([label, href], index) => (
                  <SheetClose asChild key={href}>
                    <a href={href}>
                      <span>0{index + 1}</span>
                      {label}
                      <ArrowRight aria-hidden="true" />
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <SheetClose asChild>
                <OrderButton className="w-full" />
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-rays" aria-hidden="true" />
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><span />Hambúrguer artesanal. Atitude autêntica.</div>
          <h1 id="hero-title">
            Sabor que<br />
            <span>deixa marca.</span>
          </h1>
          <p>
            Uma experiência feita para quem leva hambúrguer a sério — personalidade forte,
            presença à mesa e cada detalhe no ponto.
          </p>
          <div className="hero-actions">
            <OrderButton />
            <Button asChild variant="editorial" size="xl">
              <a href="#cardapio">
                Ver cardápio <ArrowDown aria-hidden="true" />
              </a>
            </Button>
          </div>
          <div className="hero-status" aria-label="Informação do cardápio">
            <span className="status-dot" />
            Cardápio oficial em atualização
          </div>
        </div>

        <div className="hero-emblem" aria-label="Logo oficial La Dona Hamburgueria">
          <div className="orbit orbit-one" aria-hidden="true"><span>LD</span></div>
          <div className="orbit orbit-two" aria-hidden="true" />
          <div className="logo-stage">
            <Logo className="hero-logo" />
          </div>
          <div className="micro-badge" aria-hidden="true">
            <MousePointer2 /> <span>XP +100</span>
          </div>
        </div>
      </div>
      <a href="#cardapio" className="scroll-cue" aria-label="Ir para o cardápio">
        <span>Explore</span><ArrowDown aria-hidden="true" />
      </a>
    </section>
  );
}

function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>(categories[0]);

  return (
    <section id="cardapio" className="section section-light" aria-labelledby="menu-title">
      <div className="section-shell">
        <div id="menu-title">
          <SectionIntro
            index="01"
            kicker="O cardápio"
            title="Escolha sua próxima obsessão."
            body="O cardápio oficial será publicado aqui com fotos, ingredientes, preços e links diretos para pedido. Sem atalhos. Sem informação inventada."
          />
        </div>

        <div className="category-tabs reveal" role="tablist" aria-label="Categorias do cardápio">
          {categories.map((category) => (
            <Button
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "ghost"}
              className="category-tab"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="menu-empty reveal" role="tabpanel" aria-live="polite">
          <div className="placeholder-visual" aria-hidden="true">
            <span className="placeholder-ring" />
            <span className="placeholder-cross">+</span>
            <Sparkles />
          </div>
          <div className="menu-empty-copy">
            <span className="availability-tag">Em atualização</span>
            <h3>{activeCategory} chegando ao cardápio.</h3>
            <p>
              Este espaço receberá os itens oficiais da categoria, com foto real, descrição,
              preço e acesso direto ao pedido.
            </p>
            <Button asChild variant="editorial" size="lg">
              <a href="#contato">Acompanhar canais oficiais <ArrowRight aria-hidden="true" /></a>
            </Button>
          </div>
        </div>

        <div className="menu-specs" aria-label="Estrutura preparada do cardápio">
          {["Foto real", "Ingredientes", "Preço", "Pedido direto"].map((item, index) => (
            <div key={item} className="spec-item reveal">
              <span>0{index + 1}</span>
              <strong>{item}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="sobre" className="section section-dark about-section" aria-labelledby="about-title">
      <div className="section-shell">
        <div id="about-title">
          <SectionIntro
            index="02"
            kicker="A experiência"
            title="Feita para ser lembrada."
            body="A La Dona une a força visual de uma hamburgueria clássica a uma experiência contemporânea, direta e cheia de personalidade."
          />
        </div>
        <div className="about-layout">
          <div className="about-art reveal" aria-hidden="true">
            <div className="art-number">LD</div>
            <div className="art-stamp">Autêntica<br />por natureza</div>
          </div>
          <div className="about-copy reveal">
            <span className="eyebrow"><span />O que move a La Dona</span>
            <p className="about-lead">
              Sabor, qualidade e presença — os princípios de uma experiência artesanal que não
              precisa gritar para ser inesquecível.
            </p>
            <p>
              As informações sobre a origem, o processo e o ambiente da La Dona serão adicionadas
              aqui assim que o conteúdo institucional oficial estiver disponível.
            </p>
            <div className="values-grid">
              <div><span>01</span><strong>Personalidade</strong></div>
              <div><span>02</span><strong>Experiência</strong></div>
              <div><span>03</span><strong>Qualidade</strong></div>
              <div><span>04</span><strong>Atitude</strong></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  return (
    <section id="avaliacoes" className="section section-paper reviews-section" aria-labelledby="reviews-title">
      <div className="section-shell">
        <div id="reviews-title">
          <SectionIntro
            index="03"
            kicker="Quem prova, fala"
            title="Opiniões sem roteiro."
            body="Esta área está pronta para receber avaliações verificadas de clientes, preservadas exatamente como foram publicadas."
          />
        </div>
        <div className="reviews-layout">
          <div className="review-score reveal">
            <Quote aria-hidden="true" />
            <strong>—</strong>
            <div className="stars" aria-label="Avaliações ainda não disponíveis">
              {Array.from({ length: 5 }).map((_, index) => <Star key={index} aria-hidden="true" />)}
            </div>
            <span>Aguardando avaliações reais</span>
          </div>
          <div className="review-placeholder reveal">
            <span className="availability-tag">Espaço reservado</span>
            <blockquote>
              “As avaliações reais da La Dona aparecerão aqui, com o nome do cliente e o texto original.”
            </blockquote>
            <div className="review-author">
              <span className="avatar-placeholder" aria-hidden="true">LD</span>
              <div><strong>Cliente verificado</strong><span>Em breve</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="section section-dark gallery-section" aria-labelledby="gallery-title">
      <div className="section-shell">
        <div id="gallery-title">
          <SectionIntro
            index="04"
            kicker="Galeria"
            title="O universo La Dona."
            body="Em breve, fotos reais dos produtos, do espaço e dos momentos que fazem parte da experiência."
          />
        </div>
        <div className="gallery-grid" aria-label="Espaços reservados para fotos reais">
          {["Produtos", "Ambiente", "Detalhes", "Experiência"].map((label, index) => (
            <div key={label} className={`gallery-placeholder gallery-${index + 1} reveal`}>
              <span>0{index + 1}</span>
              <div className="gallery-mark" aria-hidden="true">+</div>
              <strong>{label}</strong>
              <small>Foto real em breve</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contato" className="section contact-section" aria-labelledby="contact-title">
      <div className="section-shell contact-shell">
        <div className="contact-copy reveal">
          <span className="section-kicker"><span>05</span><span>Fale com a gente</span></span>
          <h2 id="contact-title">A próxima mordida começa aqui.</h2>
          <p>
            Os canais oficiais de atendimento e pedido serão publicados assim que as informações
            da La Dona forem disponibilizadas.
          </p>
          <OrderButton />
          <p className="contact-note" role="status">
            O botão direciona para esta área enquanto o WhatsApp oficial não foi informado.
          </p>
        </div>
        <div className="contact-board reveal">
          <div className="contact-row">
            <MapPin aria-hidden="true" />
            <div><span>Endereço</span><strong>Aguardando informação oficial</strong></div>
          </div>
          <div className="contact-row">
            <MessageCircle aria-hidden="true" />
            <div><span>WhatsApp</span><strong>Aguardando número oficial</strong></div>
          </div>
          <div className="contact-row">
            <Instagram aria-hidden="true" />
            <div><span>Instagram</span><strong>Aguardando perfil oficial</strong></div>
          </div>
          <div className="contact-row">
            <Clock3 aria-hidden="true" />
            <div><span>Horários</span><strong>Aguardando horários oficiais</strong></div>
          </div>
          <div className="map-placeholder" aria-label="Espaço reservado para o mapa">
            <span className="map-grid" aria-hidden="true" />
            <MapPin aria-hidden="true" />
            <strong>Mapa disponível após confirmação do endereço</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Logo className="footer-logo" />
          <div><strong>La Dona</strong><span>Hamburgueria</span></div>
        </div>
        <p>Sabor com personalidade. Experiência com presença.</p>
        <nav aria-label="Navegação do rodapé">
          {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} La Dona Hamburgueria</span>
        <span className="footer-code">PRESS START TO TASTE</span>
      </div>
    </footer>
  );
}

export function HomePage() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-frame">
      <Header />
      <main>
        <Hero />
        <MenuSection />
        <AboutSection />
        <ReviewsSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}