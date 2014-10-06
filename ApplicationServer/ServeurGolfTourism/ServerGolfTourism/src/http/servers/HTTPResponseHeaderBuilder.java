package http.servers;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;

import logger.Logger;
import configuration.ConfLoader;

public class HTTPResponseHeaderBuilder {

	private File HeadersDirectory;
	private HashMap<String, String> HeadersList;

	public HTTPResponseHeaderBuilder(File HeadersDirectory) {
		this.HeadersDirectory = HeadersDirectory;
		HeadersList = new HashMap<String, String>();
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

	private String readFile(File f) {
		FileReader fr;
		String s = "";
		try {
			fr = new FileReader(f);
			BufferedReader bf = new BufferedReader(fr);
			String line;

			while ((line = bf.readLine()) != null) {
				s = s + "\n" + line;
			}
			bf.close();
		} catch (IOException e) {
			e.printStackTrace();
			Logger.addLogToBeWritten(ConfLoader.getEntry("loggerErrorsName"), e.toString());
		}
		return s;
	}

	public String getHeaderOf(String response) {
		return this.HeadersList.get(response);
	}
}
