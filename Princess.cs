using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Princess_Library
{
    public class Princess
    {
        string name;
        double weight;
        double height;
        int age;
        string character;
        public string Name
        {
            get { return name; }
            set {
                name = value;

                if (string.IsNullOrWhiteSpace(value))
                {
                    throw new ArgumentException("Имя принцессы не может быть пустым или содержать только пробелы.");
                }
                 
            }
        }
        public double Height
        {
            get { return height; }
            set {
                if (value < 0)
                {
                    throw new ArgumentException("Недопустимый рост принцессы.");
                }
                height = value; 
            }
        }
        public int Age
        {
            get { return age; }
            set {
                if (value < 0 || value > 200)
                    
                {
                    throw new ArgumentException("Недопустимый возраст принцессы.");
                }
                    age = value; }
        }
        public double Weight
        {
            get { return weight; }
            set {
                if (value < 0)
                {
                    throw new ArgumentException("Вес принцессы не может быть отрицательным.");
                }
                weight = value; }
        }
        public string Character
        {
            get { return character; }
            set { character = value; }
        }
        public virtual string Info1()
        {
                switch (character)
                {
                    case "скромная":
                        {
                            Character = "скромная";
                            return "Характер принцессы " + Name + "-" + Character + "\n";
                        }
                    case "капризная":
                        {
                            Character = "капризная";
                            return "Характер принцессы " + Name + "-" + Character + "\n";
                        }
                    case "добрая":
                       {
                           Character = "добрая";
                           return "Характер принцессы " + Name + "-" + Character + "\n";
                       }
                   case "депрессивная":
                       {
                           Character = "депрессивная";
                           return "Характер принцессы " + Name + "-" + Character + "\n";
                       }
                  case "веселая":
                       {
                           Character = "веселая";
                           return "Характер принцессы " + Name + "-" + Character + "\n";
                           
                       }
                }
            return Character;
        }
        public void ChangeWeight(double change)
        {
            Weight += change;
        }
        public double CalculateBMI()
        {
            if (age >= 20)
            {
                return (Weight / Math.Pow(Height / 100, 2)) + 1;
            }
            else if (age < 20)
            {
                return (Weight / Math.Pow(Height / 100, 2)) - 1;
            }
            else
            {
                return (Weight / Math.Pow(Height / 100, 2)) + 1;
            }
            
        }
        public virtual string Info()
        {
            double idealBMI = 20.0;
            string result = "";
            double weightChange = Math.Round((idealBMI - CalculateBMI()) - (Height / 100 * Height / 100), 1);

             if (weightChange > 0)
             {               
                result =  " принцессе " + Name + ", весом " + Weight + " кг, нужно прибавить " + weightChange + " кг." + "\n";
             }
             
             else if (weightChange < 0)
             {
               result = "принцессе " + Name + ", весом " + Weight + " кг, нужно сбросить " + Math.Abs(weightChange) + " кг." + "\n";
             }
             return result;
        }
    }
    public class EastPrincess : Princess
    { 
        string country;
        public string Country
        {
            get { return country; }
            set { country = value; }
        }
        public override string Info()
        {
             double EidealBMI = 30.0;
             string result = "";
             double EweightChange = Math.Round((EidealBMI - CalculateBMI()) - (Height / 100 * Height / 100), 2);

          if (EweightChange > 0)
          {
              result = "принцессе " + Name + ", весом " + Weight + " кг, нужно прибавить " + EweightChange + " кг." + "\n";
          }

          else if (EweightChange < 0)
          {
              result = "принцессе " + Name + ", весом " + Weight + " кг, нужно сбросить " + Math.Abs(EweightChange) + " кг." + "\n";
          }
            return result;
        }

    }
    public class DisneyPrincess : Princess
    {
        string cartoon;
        public string Cartoon
        {
            get { return cartoon; }
            set { cartoon = value; }
        } 

        public override string Info()
        {
            double DidealBMI = 15.0;
            string result = "";
            double DweightChange = Math.Round((DidealBMI - CalculateBMI()) - (Height / 100 * Height / 100), 2);

             if (DweightChange > 0)
             {
                 result = "принцессе " + Name + ", весом " + Weight + " кг, нужно прибавить " + DweightChange + " кг." + "\n";
             }

             else if (DweightChange < 0)
             {
                result = " принцессе " + Name + ", весом " + Weight + " кг, нужно сбросить " + DweightChange + " кг." + "\n";
             }
            return result;
        }
    }
}

