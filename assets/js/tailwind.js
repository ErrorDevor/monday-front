tailwind.config = {
    content: [
        "./dist/*.html",
        "./src/**/*.html",
        "./src/**/*.hbs",
        "./src/**/*.js",
        "./src/**/*.ts",
    ],
    theme: {
        extend: {
            screens: {
                xs: "390px",
                sm: "576px",
                md: "768px",
                lg: "991px",
                xl: "1124px",
                xxl: "1360px",
            },
            fontFamily: {
                Gilroy: ["Gilroy", "sans-serif"],
                Helvetica: ["Helvetica Neue", "sans-serif"],
                MazzardM: ["Mazzard M", "sans-serif"],
                MazzardH: ["Mazzard H", "sans-serif"],
                Satoshi: ["Satoshi", "sans-serif"],
                IntegralCF: ["Integral CF", "sans-serif"],
            },
            colors: {
                black: {
                    DEFAULT: "#202020",
                },
                blue: {
                    DEFAULT: "#4790FF",
                    cedf4ff: "#EDF4FF",
                },
                gray: {
                    light: "#F2F2F2",
                    fafafc: "#FAFAFC",
                    DEFAULT: "#9CA5B3",
                    dark: "#575E6A",
                    b7c3d6: "#B7C3D6",
                    c575e6a: "#575E6A",
                    c9ca5b3: "#9CA5B3",
                    caeb5bf: "#AEB5BF",
                    cb7c3d6: "#B7C3D6",
                    cf1f3f9: "#F1F3F9"
                },
                yellow: {
                    DEFAULT: "#FFD600",
                },
                red: {
                    ultralight: "#FFFFFF",
                    light: "#FF8E8E",
                },
                white: {
                    DEFAULT: "#FFFFFF",
                    f9: "#F9F9F9"
                },
                green: {
                    ultralight: "#D1FFD0",
                },
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
    ],
  }