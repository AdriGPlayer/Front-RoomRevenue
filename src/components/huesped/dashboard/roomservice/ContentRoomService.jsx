import { useState } from "react";

export default function ContentRoomService() {
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const filterMenu = (category) => {
    setSelectedCategory(category);
  };

  const menuItems = [
    {
      category: "tradicionales",
      title: "Desayuno Continental",
      description:
        "Selección de panes, mermeladas, frutas frescas y café o té.",
      price: "$15.00",
      image:
        "https://images.unsplash.com/photo-1533089860892-a9b969df67e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      category: "tradicionales",
      title: "Desayuno Americano",
      description: "Huevos, tocino, tostadas, jugo de naranja y café.",
      price: "$18.00",
      image:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      category: "saludables",
      title: "Desayuno Saludable",
      description: "Yogurt, granola, frutas frescas y té verde.",
      price: "$14.00",
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
    {
      category: "especiales",
      title: "Omelette Especial",
      description: "Omelette con queso, champiñones, espinacas y tomate.",
      price: "$16.00",
      image:
        "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    },
  ];

  return (
    <div className="huesped-desayunos-section ">
      <div className="huesped-section-header">
        <h2 className="huesped-section-title">
          <i className="fas fa-utensils"></i> Nuestros Desayunos
        </h2>
      </div>

      <div className="huesped-filter-tabs">
        {["todos", "tradicionales", "saludables", "especiales"].map(
          (category) => (
            <button
              key={category}
              className={`huesped-filter-tab ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => filterMenu(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          )
        )}
      </div>

      <div className="huesped-menu-category">
        <h3 className="huesped-menu-category-title">
          Desayunos Completos{" "}
          <span className="huesped-badge">Más Populares</span>
        </h3>
        <div className="huesped-menu-grid">
          {menuItems
            .filter(
              (item) =>
                selectedCategory === "todos" ||
                item.category === selectedCategory
            )
            .map((item, index) => (
              <div
                key={index}
                className="huesped-menu-card"
                data-category={item.category}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="huesped-menu-card-image"
                />
                <div className="huesped-menu-card-content">
                  <h4 className="huesped-menu-card-title">{item.title}</h4>
                  <p className="huesped-menu-card-description">
                    {item.description}
                  </p>
                  <div className="huesped-menu-card-footer">
                    <div className="huesped-menu-card-price">{item.price}</div>
                    <button className="huesped-add-btn">
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
