import React from 'react'
import Table from './Table';
import RoomTable from './RoomTable';

const Dubai = () => {
  const tableData = {
    titles:["Nisja", "Tipi i dhomës", "Shërbimi", "Udhëtimi", "Çmimi", "Per person"],
    data:[
    { date: "11 Dhjetor", roomType: "Double Room", service: "Bed & Breakfast", duration: "6 ditë", price: "€ 439", perPerson: "Per person" },
    { date: "13 Dhjetor", roomType: "Double Room", service: "Bed & Breakfast", duration: "6 ditë", price: "€ 439", perPerson: "Per person" },
    { date: "08 Janar", roomType: "Double Room", service: "Bed & Breakfast", duration: "6 ditë", price: "€ 439", perPerson: "Per person" },
    { date: "10 Janar", roomType: "Double Room", service: "Bed & Breakfast", duration: "6 ditë", price: "€ 439", perPerson: "Per person" },
    { date: "13 Janar", roomType: "Double Room", service: "Bed & Breakfast", duration: "5 ditë", price: "€ 399", perPerson: "Per person" },
    { date: "15 Janar", roomType: "Double Room", service: "Bed & Breakfast", duration: "6 ditë", price: "€ 439", perPerson: "Per person" },
    { date: "17 Janar", roomType: "Double Room", service: "Bed & Breakfast", duration: "6 ditë", price: "€ 439", perPerson: "Per person" },
    { date: "20 Janar", roomType: "Double Room", service: "Bed & Breakfast", duration: "6 ditë", price: "€ 439", perPerson: "Per person" },
    { date: "22 Janar", roomType: "Double Room", service: "Bed & Breakfast", duration: "6 ditë", price: "€ 439", perPerson: "Per person" },
    { date: "24 Janar", roomType: "Double Room", service: "Bed & Breakfast", duration: "6 ditë", price: "€ 439", perPerson: "Per person" },
  ]}
  return (
  <>
  <RoomTable tableData={tableData}/>





<Table  
        perfshihet={['Bileta e aeroplanit',"Transferi nga Aeroporti në Hotelet dhe anasjelltas", "Akomodimi në Hotel në Abu Dhabi dhe Dubai", "Mëngjeset në Hotel", "Shëtitjet me Autobus sipas Programit", "Shoqërues në shqip gjatë gjithë udhëtimit", "Guida vendase në disa Shëtitje", "Vetëm 1 çantë shpine"]} 
        nukPerfshihet={[
            "Xhiro me Anije Catamaran në Dubai Marina me transfertë - €42",
            "Darke 4 Set menu + 1 pije me Pamje nga Shfaqja me Shatervani - €60",
            "Ngjitje në Ndërtesën më të lartë Burj Khalifa me transfertë- €68",
            "Biletë hyrje tek Dubai Frame ose Miracle Garden me transfertë - €47",
            "Shëtitje dhe Darkë Safari në Shkretëtirë me transfertë- €60"]}
      />
  </>)
}

export default Dubai
