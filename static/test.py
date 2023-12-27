from datetime import datetime
import pytz


def convert_PT_to_MT(pt_str):
    """
    converts PT time to MT time
    """
    pt_tz = pytz.timezone("US/Eastern")
    mt_tz = pytz.timezone("US/Mountain")
    
    pt_str = pt_str.split()[0] + " " + pt_str.split()[1]
    dt_pt = datetime.strptime(pt_str, "%I:%M %p")
    dt_pt = pt_tz.localize(dt_pt)
    
    # need to provide Y/M/D due to time offsets happening, stack overflow has a lot of cases where pytz "bugs out"
    dt_curr = datetime.now()
    dt_pt = datetime(dt_curr.year, dt_curr.month, dt_curr.day, dt_pt.hour, dt_pt.minute)
    dt_pt = pt_tz.localize(dt_pt)
    
    dt_mt = dt_pt.astimezone(mt_tz)
    mt_str = dt_mt.strftime("%I:%M") + " pm MT"
    mt_str = mt_str.strip("0")
    return mt_str
    
    

a = convert_PT_to_MT("11:30 pm ET")
print(a)