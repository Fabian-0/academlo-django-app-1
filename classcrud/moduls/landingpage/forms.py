from django import forms

account_types = [
  ('', 'Select account type'),
  ('student', 'Student'),
  ('professor', 'Professor'),
]

class Login(forms.Form):
  email = forms.EmailField(max_length=100, widget=forms.EmailInput(attrs={"placeholder": "Email"}))
  password = forms.CharField(max_length=100, widget=forms.PasswordInput(attrs={"placeholder": "Password"}))
  account_type = forms.ChoiceField(choices=account_types)

class Register(forms.Form):
  first_name = forms.CharField(max_length=50, widget=forms.TextInput(attrs={"placeholder": "First name"}))
  last_name = forms.CharField(max_length=50, widget=forms.TextInput(attrs={"placeholder": "Last name"}))
  email = forms.EmailField(max_length=100, widget=forms.EmailInput(attrs={"placeholder": "Email"}))
  avatar = forms.URLField(max_length=255, widget=forms.URLInput(attrs={"placeholder": "Avatar url"}))
  password = forms.CharField(max_length=15, widget=forms.PasswordInput(attrs={"placeholder": "Password"}))
  account_type = forms.ChoiceField(choices=account_types)