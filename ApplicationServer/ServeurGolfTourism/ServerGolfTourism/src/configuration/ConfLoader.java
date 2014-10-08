/**   \author Adrien ORTOLA */
package configuration;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;

/**
 * \class ConfLoader
 * \brief Class managing the loading of configurations. A configuration file "AppServer.conf" must be placed at the root of the server directory.
 * */
public class ConfLoader {
	
	/** HashMap storing all the configuration attributes */
	private static HashMap<String,String> entries;
	
	/** 
	 * \param none
	 * \return HashMap<String,String> containing all the configuration attributes
	 * \brief Loads the configuration file into a HashMap where the keys are represented by the name of the requested attribute and the values by the corresponding value.
	 * */
	public static void loadConfigFile(){
		entries = new HashMap<String,String>();
		try {
			FileReader fr = new FileReader(new File("AppServer.conf"));
			BufferedReader bf = new BufferedReader(fr);
			String line;
			while((line = bf.readLine())!=null){
				String [] split=line.split("=");
				entries.put(split[0], split[1]);
			}
			bf.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/** 
	 * \param String key
	 * \return String
	 * \brief returns the String value corresponding to a key which is the name of the requested attribute
	 * */
	public static String getEntry(String key) {
		return entries.get(key);
	}
}
