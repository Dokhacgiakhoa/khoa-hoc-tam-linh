import React, { useState, useEffect } from "react";
import CartView from "../tai-khoan/CartView";

export default function CartPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  return (
    <main className="cart-page-wrapper py-5">
      <div className="container" style={{ maxWidth: "1200px" }}>
        <CartView user={user} />
      </div>
    </main>
  );
}
