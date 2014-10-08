package http.servers;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import logger.Logger;
import configuration.ConfLoader;

public class HTTPResponseHeaderBuilder {

	private static File HeadersDirectory;
	private static HashMap<String, HashMap<String,String>> HeadersList;

	public HTTPResponseHeaderBuilder(File HeadersDirectory) {
		this.HeadersDirectory = HeadersDirectory;
		HeadersList = new HashMap<String, HashMap<String,String>>();
		loadHeadersCollection();
	}

	private void loadHeadersCollection() {
		if (HeadersDirectory.isDirectory()) {
			File[] list = HeadersDirectory.listFiles();
			if (list != null) {
				for (int i = 0; i < list.length; i++) {
					HeadersList.put(list[i].getName(), readFile(list[i]));
				}
			}
		}
	}

	private HashMap<String,String> readFile(File f) {
		HashMap<String,String> h = new HashMap<String,String>();
		FileReader fr;
		try {
			fr = new FileReader(f);
			BufferedReader bf = new BufferedReader(fr);
			String line;

			while ((line = bf.readLine()) != null) {
				h.put(line.split(":")[0], line.split(":")[1]);
			}
			bf.close();
		} catch (IOException e) {
			e.printStackTrace();
			Logger.addLogToBeWritten(ConfLoader.getEntry("loggerErrorsName"), this.getClass().getName()+ " - " +e.getStackTrace()[0].getLineNumber()+  " - " +  e.toString());
		}
		return h;
	}

	public static HashMap<String,String> getHeaderOf(String response) {
		return HeadersList.get(response);
	}
}
