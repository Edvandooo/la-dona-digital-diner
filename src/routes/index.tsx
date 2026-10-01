import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "La Dona Hamburgueria | Sabor com personalidade" },
      {
        name: "description",
        content:
          "Conheça a experiência La Dona Hamburgueria e acompanhe o cardápio, avaliações e canais oficiais de pedido.",
      },
      { property: "og:title", content: "La Dona Hamburgueria | Sabor com personalidade" },
      {
        property: "og:description",
        content: "Hambúrguer artesanal, atitude autêntica e uma experiência feita para marcar.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});
