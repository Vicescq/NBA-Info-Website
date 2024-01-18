import subprocess, platform
os_name = platform.system()

if os_name == "Windows":
    script_file_path = r"scripts\run.bat"
    subprocess.run([script_file_path], shell=True)
    
