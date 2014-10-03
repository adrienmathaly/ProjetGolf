package json;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;

import logger.Logger;

import org.json.simple.JSONObject;

public class JSONBuilder {

	public static String buildJSONBasicMsg(String key, Object value) {
		
		StringWriter out = new StringWriter();
		JSONObject jsono = new JSONObject();

		try {
			jsono.put(key, value);
			jsono.writeJSONString(out);
		} catch (IOException e) {
			Logger.addLogToBeWritten("Errors", "coucou");
		}
		return out.toString();
	}

	public static String buildJSONComplexMsg(HashMap<String, Object> map) throws IOException {
		StringWriter out = new StringWriter();
		JSONObject jsono = new JSONObject();
		jsono.putAll(map);
		jsono.writeJSONString(out);
		return out.toString();
	}
}
