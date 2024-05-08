import insuranceImg from '../Assets/Images/insurance.jpeg'
import schoolImg from '../Assets/Images/school.png'
import houseImg from '../Assets/Images/house.jpg'
import fournitureImg from '../Assets/Images/fourniture.png'
import carImg from '../Assets/Images/car.jpeg'
import carsImg from '../Assets/Images/cars.jpeg'

import sofa from '../Assets/Images/sofa.jpeg'
import newHouse from '../Assets/Images/newHouse.jpeg'
import newSchool from '../Assets/Images/newSChool.jpeg'
import newCar from '../Assets/Images/car-new.jpeg'


export const compagnies = [
  {
    id: 1,
    name: "RSSB",
    logo: insuranceImg
  },
  {
    id: 2,
    name: "Best Fourniture",
    logo: fournitureImg
  },
  {
    id: 3,
    name: "DND Houses",
    logo: houseImg
  },
  {
    id: 4,
    name: "Akagera Motors",
    logo: carImg
  },
  {
    id: 5,
    name: "KIgali Independant University(ULK)",
    logo: schoolImg
  },  {
    id: 6,
    name: "Toyota",
    logo: carsImg
  },
]

export const Products = [
    {
      id: 1,
      productName: "Sofa LCD400",
      name: "fournitureImg",
      logo: fournitureImg,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.",
      product: sofa
    },
    {
      id: 2,
      productName: "House in Kimironko",
      name: "DND House",
      logo: houseImg,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.",
      product: newHouse
    },
    {
      id: 3,
      productName: "Totota Sedan",
      name: "Akagera Motors",
      logo: carImg,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.",
      product: newCar
    },
    {
      id: 4,
      productName: "ULK school fees",
      name: "KIgali Independant University(ULK)",
      logo: schoolImg,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia.",
      product: newSchool
    }
  ]