import React from "react";
import Divider from "../elements/Divider";
import Logo from "../elements/Logo";
import BPDLogo from "../../assets/images/BPD.png";
import KarangasemLogo from "../../assets/images/karangasem.png";
import MenuItem from "../elements/MenuItem";
import {
  IoGitBranchOutline,
  IoCubeOutline,
  IoCartOutline,
  IoSpeedometerOutline,
  IoPricetagOutline,
  IoPersonOutline,
  IoLocationOutline,
  IoFolderOpenOutline,
} from "react-icons/io5";

export default function Sidebar() {
  const role_name = localStorage.getItem("role_name");
  return (
    <div className="bg-white text-primary lg:w-96  min-h-screen p-4">
      <div className="w-full flex justify-between items-center gap-5">
        <Logo img={KarangasemLogo} />
        <h1 className="text-xl font-semibold hidden lg:block">IPOS MBLB</h1>
        <Logo img={BPDLogo} />
      </div>
      <Divider />
      <MenuItem icon={<IoSpeedometerOutline />} name="Dashboard" href="/" />
      <Divider />
      {role_name === "Admin" &&
        <>
          <MenuItem
            icon={<IoPersonOutline />}
            name="User"
            pathParent="user"
            isDropdown
          >
            <MenuItem name="Admin" href="/user/admin" />
            <MenuItem name="Checker" href="/user/checker" />
          </MenuItem>
          <MenuItem icon={<IoPricetagOutline />} name="Penjual" href="/penjual" />
        </>
      }
      <MenuItem icon={<IoCartOutline />} name="Pembeli" href="/pembeli" />
      <MenuItem
        icon={<IoCubeOutline />}
        name="Produk"
        pathParent="produk"
        isDropdown
      > 
        {role_name === "Admin" &&
          <MenuItem name="Produk Master" href="/produk/master" />
        } 
        <MenuItem name="Produk Seller" href="/produk/seller" />
      </MenuItem>
      {role_name === "Admin" &&
        <>
          <MenuItem icon={<IoLocationOutline />} name="Lokasi" href="/lokasi" />
          <MenuItem
            icon={<IoGitBranchOutline />}
            name="Log Aktivitas"
            href="/log-aktivitas"
          />
        </>
      }

      <Divider />
      <MenuItem
        icon={<IoFolderOpenOutline />}
        name="Laporan"
        pathParent="laporan"
        isDropdown
      >
        <MenuItem name="Transaksi" href="/laporan/transaksi" />
        <MenuItem name="Harian" href="/laporan/harian" />
        <MenuItem name="Detail Transaksi" href="/laporan/detail-transaksi" />
        <MenuItem name="Pembanding" href="/laporan/pembandingr" />
      </MenuItem>
    </div>
  );
}
