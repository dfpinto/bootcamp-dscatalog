package com.devsuperior.dscatalog.dto;

import java.io.Serializable;

public class UserPasswordDTO extends UserDTO implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private String password;
	
	public UserPasswordDTO() {
		super();
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
