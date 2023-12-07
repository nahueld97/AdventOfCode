class Program
{
    static void Main(string[] args)
    {
        string line;
        int sum = 0;
        try
        {
            StreamReader sr = new StreamReader("input.txt");
            //Read the first line of text
            line = sr.ReadLine();
            //Continue to read until you reach end of file
            while (line != null)
            {
                sum += getNumber(line);
                //Read the next line
                line = sr.ReadLine();
            }
            Console.WriteLine(sum);
            //close the file
            sr.Close();
            Console.ReadLine();
        }
        catch (Exception e)
        {
            Console.WriteLine("Exception: " + e.Message);
        }
        finally
        {
            Console.WriteLine("Executing finally block.");
        }
    }

    static int getNumber (string line){
        string[] words = {"one","two","three","four","five","six","seven","eight","nine"};
        List<int> numbers = new List<int>();
        char[] chars = line.ToCharArray();
        char cursor;
        bool founded;
        for (int i = 0; i < chars.Length ; i++)
        {
            cursor = chars[i];
            if( Char.IsNumber(cursor)){
                numbers.Add(Int32.Parse(cursor.ToString()));
            }else{
                for (int j = 0; j < words.Length; j++)
                {
                    string word = words[j];
                    founded = false;
                    if(i+word.Length <= chars.Length){
                        founded = word.Equals(line.Substring(i,word.Length));
                    }
                    if (founded)
                    {
                        numbers.Add(j+1);
                        break;
                    }
                }
            }
        }
        return Int32.Parse(""+numbers[0]+numbers[numbers.Count - 1]);
    }
}