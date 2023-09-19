"use client";

import { DRAWER_ITEMS } from "@/app/data";
import { useState } from "react";
import Drawer from "./Drawer";
import Navbar from "./Navbar";
import NestedList from "./NestedList";

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const handleDrawerToggle = () => setDrawerOpen(prev => !prev);

    return (
        <header className="flex">
            <Navbar onDrawerToggle={handleDrawerToggle} />
            <nav>
                <Drawer open={drawerOpen} onClose={handleDrawerToggle}>
                    <NestedList list={DRAWER_ITEMS} />
                </Drawer>
            </nav>
        </header>
    );
};

export default Header;
