export const categoryData = {
    grocery: {
      title: "Grocery",
      items: [
        {
          title: "Masala & Spices",
          image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80",
        },
        {
          title: "Dry Fruits",
          image: "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?w=500&q=80",
        },
        {
          title: "Rice & Rice Products",
          image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80",
        },
        {
          title: "Dals & Pulses",
          image: "https://images.unsplash.com/photo-1585996746349-d61f7e6d9136?w=500&q=80",
        },
        {
          title: "Cooking Oil",
          image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80",
        },
        {
          title: "Ghee & Vanaspati",
          image: "https://images.unsplash.com/photo-1631451095765-2c91616fc9e6?w=500&q=80",
        },
      ]
    },
    snacks: {
      title: "Snacks & Packed Food",
      items: [
        {
          title: "Biscuits & Cookies",
          image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80",
        },
        {
          title: "Namkeens & Snacks",
          image: "https://images.unsplash.com/photo-1613919113640-25732ec5e61f?w=500&q=80",
        },
        {
          title: "Chocolates & Candies",
          image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=500&q=80",
        },
        {
          title: "Noodles & Pasta",
          image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?w=500&q=80",
        },
      ]
    },
    beverages: {
      title: "Beverages",
      items: [
        {
          title: "Tea & Coffee",
          image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80",
        },
        {
          title: "Soft Drinks",
          image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=500&q=80",
        },
        {
          title: "Fruit Juices",
          image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=500&q=80",
        },
      ]
    },
    personalCare: {
      title: "Personal Care",
      items: [
        {
          title: "Skin Care",
          image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=500&q=80",
        },
        {
          title: "Hair Care",
          image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&q=80",
        },
        {
          title: "Oral Care",
          image: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=500&q=80",
        },
      ]
    },
    householdItems: {
      title: "Household Items",
      items: [
        {
          title: "Detergents",
          image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500&q=80",
        },
        {
          title: "Cleaners",
          image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=500&q=80",
        },
        {
          title: "Air Fresheners",
          image: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=500&q=80",
        },
      ]
    }
  };


  // data/categories.ts
export interface Category {
    id: string;
    title: string;
    startingPrice: string;
    image: { uri: string };
    description?: string;
  }
  
  export const CATEGORIES: Category[] = [
    {
      id: 'fruits-vegetables',
      title: "Fruits & Vegetables",
      startingPrice: "₹9/kg",
      image: { uri: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=500&q=80" },
      description: 'Fresh fruits and vegetables',
    },
    {
      id: 'masala-spices',
      title: "Masala & Spices",
      startingPrice: "₹45/pack",
      image: { uri: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=500&q=80" },
      description: 'Authentic Indian spices',
    },
    // Add more categories...
  ];