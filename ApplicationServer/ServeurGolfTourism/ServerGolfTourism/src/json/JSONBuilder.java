/**   \author Adrien ORTOLA */
package json;

import java.io.IOException;
import java.io.StringWriter;
import logger.Logger;
import org.json.simple.JSONObject;
import configuration.ConfLoader;

/**
 * \class JSONBuilder
 * \brief The purpose of this class is to provide
 * */
public class JSONBuilder {

	/** 
	 * \param
	 * \return
	 * \brief 
	 * */
	public static String buildJSONBasicMsg(String key, Object value) {
		StringWriter out = new StringWriter();
		JSONObject jsono = new JSONObject();
		try {
			jsono.put(key, value);
			jsono.writeJSONString(out);
		} catch (IOException e) {
			Logger.addLogToBeWritten(ConfLoader.getEntry("loggerErrorsName"), e.toString());
		}
		return out.toString();
	}
}
