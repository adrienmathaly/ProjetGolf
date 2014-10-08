/**   \author Adrien ORTOLA */
package http.users;

/**
 * \class Point
 * \brief The purpose of this class is to model coordinates.
 * */
public class Point {
	
	private Float latitude;
	private Float longitude;

	/** 
	 * \param
	 * \return
	 * \brief 
	 * */
	public Point(Float latitude,Float longitude){
		this.setLatitude(latitude);
		this.setLongitude(longitude);
	}

	/** 
	 * \param
	 * \return
	 * \brief 
	 * */
	public Float getLatitude() {
		return latitude;
	}

	/** 
	 * \param
	 * \return
	 * \brief 
	 * */
	public void setLatitude(Float latitude) {
		this.latitude = latitude;
	}

	/** 
	 * \param
	 * \return
	 * \brief 
	 * */
	public Float getLongitude() {
		return longitude;
	}

	/** 
	 * \param
	 * \return
	 * \brief 
	 * */
	public void setLongitude(Float longitude) {
		this.longitude = longitude;
	}
	
	/** 
	 * \param Point otherPoint
	 * \return Flaot
	 * \brief calculates the distance between the current point and another one.
	 * */
	public Float distanceBetweenMeAnd(Point otherPoint){
		return (float) Math.sqrt(((otherPoint.getLatitude()-latitude)*(otherPoint.getLatitude()-latitude))+((otherPoint.getLongitude()-longitude)*(otherPoint.getLongitude()-longitude)));
	}
}
