const welcome = (req, res) => {
  res.render("welcome", {
    title: "Welcome",
    pageText: {
      title: "petals",
      body: "Welcome to Petals: Laramie's online flower shop. Browse our selection to find the perfect flowers for any occasion.",
      link: {
        text: "View our shop",
        href: "/shop",
      },
    },
  });
};

const shop = (req, res) => {
  res.render("shop", {
    title: "Order flowers",
    items: [
      {
        name: "classy",
        href: "https://cdn.shopify.com/s/files/1/0285/3663/5485/products/PeachFancyFlowerBouquet_FlowerFix_Subscription.9836_500x.jpg?v=1610587470",
        price: 64.99,
        inStock: true,
        stars: 4,
      },
      {
        name: "pink",
        href: "https://flowergiftkorea.com/wp-content/uploads/2016/10/A-Walk-To-Remember-Flower-Bouquet.jpg",
        price: 74.99,
        inStock: false,
        stars: 5,
      },
      {
        name: "contrast",
        href: "https://cdn.shopify.com/s/files/1/0224/1377/0816/files/happy_energy_top_2566c728-cfe9-4436-87c0-3a04da9970fa_480x480.jpg?v=1605643375",
        price: 54.99,
        inStock: true,
        stars: 5,
      },
    ],
    sidebar: {
      title: "Information",
      content:
        "Click on a bouquet for more information including pricing and buying options.",
    },
  });
};

const cart = (req, res) => {
  res.render("index", { title: "Your cart" });
};

module.exports = {
  welcome,
  shop,
  cart,
};
