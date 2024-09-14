import { navItems } from "@/constants";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import NavItemButton from "../NavItems";
import Link from "next/link";
import AuthButtons from "../buttons/AuthButtons";

/**
 *
 * todo: Add logic to show skimmer on the nav items if the session has not yet mounted
 *
 */

const Nav_Aside = () => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="mid">
      {" "}
      <ul className="sidebar-nav_elements">
        {session ? (
          <>
            {navItems.map((item) => {
              const isActive: boolean = item.url === pathname;
              return (
                <li
                  key={item.id}
                  className={`${
                    isActive
                      ? "bg-purple-gradient text-white bg-slate-300/10 rounded-2xl"
                      : "text-gray-500"
                  }`}
                >
                  <NavItemButton>
                    <Link href={item.url}>
                      <span
                        dangerouslySetInnerHTML={{ __html: item.logoSvg }}
                        className={`${isActive ? "brightness-200" : ""}`}
                      />{" "}
                    </Link>
                  </NavItemButton>
                </li>
              );
            })}
            <AuthButtons isLogin={true} onClick={() => signOut()} />
          </>
        ) : (
          <AuthButtons isLogin={false} onClick={() => signIn()} />
        )}
      </ul>
    </nav>
  );
};

export default Nav_Aside;
