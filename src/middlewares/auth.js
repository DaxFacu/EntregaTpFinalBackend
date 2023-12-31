export function checkUser(req, res, next) {
  if (req.session.email) {
    if (req.session.email == "adminCoder@coder.com") {
      req.session.rol = "admin";
      return next();
    } else {
      req.session.rol = "user";
      return next();
    }
  }
  return res.status(401).render("error-page", {
    msg: "Please log in",
    link: "/login",
    textLink: "Volver al login",
  });
}

export function checkLogin(req, res, next) {
  if (!req.session.email) {
    return next();
  } else {
    return res.status(400).render("error-page", {
      msg: "User logeado",
      link: "/products",
      textLink: "Volver a productos",
    });
  }
}

export function checkAdmin(req, res, next) {
  if (req.session.email == "adminCoder@coder.com") {
    req.session.rol = "admin";
    return next();
  }
  return res.status(3).render("error-page", {
    msg: "Please log in AS ADMIN!",
    link: "/products",
    textLink: "Volver a productos",
  });
}

export async function checkUserCart(req, res, next) {
  const { id } = req.params;
  if (req.user.cart == id.toString()) {
    return next();
  }
  return res.status(400).render("error-page", {
    msg: "Imposible acceder al carrito, compruebe que sea el suyo",
    link: "/products",
    textLink: "Volver a productos",
  });
}
