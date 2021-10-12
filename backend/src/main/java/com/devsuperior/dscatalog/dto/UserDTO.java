package com.devsuperior.dscatalog.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.devsuperior.dscatalog.entities.User;
import com.devsuperior.dscatalog.services.validation.UserInsertValid;

@UserInsertValid
public class UserDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	@NotBlank(message = "Campo obrigatório")
	private String firstName;
	
	@NotBlank(message = "Campo obrigatório")
	private String lastName;
	
	@Email(message = "Informar um email válido")
	private String email;
	private Set<RoleDTO> roles = new HashSet<>();
	
	public UserDTO() {
	}

	public UserDTO(Long id, String firstName, String lastName, String email, Set<RoleDTO> roles) {
		this.id = id;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.roles = roles;
	}

	public UserDTO(User user) {
		this.id = user.getId();
		this.firstName = user.getFirstName();
		this.lastName = user.getLastName();
		this.email = user.getEmail();
		user.getRoles().forEach(role -> roles.add(new RoleDTO(role)));
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Set<RoleDTO> getRoles() {
		return roles;
	}

	public void setRoles(Set<RoleDTO> roles) {
		this.roles = roles;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserDTO other = (UserDTO) obj;
		return Objects.equals(id, other.id);
	}
}
