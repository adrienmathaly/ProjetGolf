/**   \author Adrien ORTOLA */
package http.users;

/**
 * \class Point
 * \brief The purpose of this class is to model coordinates.
 * */
public class Point {
	
	/** the latitude of the user */
	private Float latitude;
	/** the longitude of the user */
	private Float longitude;

	/** 
	 * \param Float latitude,Float longitude
	 * \return void
	 * \brief Constructor.
	 * */
	public Point(Float latitude,Float longitude){
		this.setLatitude(latitude);
		this.setLongitude(longitude);
	}

	/** 
	 * \param none
	 * \return Float
	 * \brief returns the latitude of the user
	 * */
	public Float getLatitude() {
		return latitude;
	}

	/** 
	 * \param none
	 * \return void
	 * \brief sets the latitude of the user
	 * */
	public void setLatitude(Float latitude) {
		this.latitude = latitude;
	}

	/** 
	 * \param none
	 * \return Float
	 * \brief returns the longitude of the user
	 * */
	public Float getLongitude() {
		return longitude;
	}

	/** 
	 * \param Float longitude
	 * \return void
	 * \brief sets the longitude of the user
	 * */
	public void setLongitude(Float longitude) {
		this.longitude = longitude;
	}
	
	/** 
	 * \param Point otherPoint
	 * \return Float
	 * \brief calculates the distance between the current point and another one.
	 * */
	public Float distanceBetweenMeAnd(Point otherPoint){
		return (float) Math.sqrt(((otherPoint.getLatitude()-latitude)*(otherPoint.getLatitude()-latitude))+((otherPoint.getLongitude()-longitude)*(otherPoint.getLongitude()-longitude)));
	}
}
