from django.shortcuts import render
from django.core.management import call_command
from django.contrib.admin.views.decorators import staff_member_required
from io import StringIO

@staff_member_required
def list_urls(request):
    output = StringIO()
    call_command('show_urls', stdout=output)
    urls_output = output.getvalue()
    return render(request, 'urls_list.html', {'urls_text': urls_output})